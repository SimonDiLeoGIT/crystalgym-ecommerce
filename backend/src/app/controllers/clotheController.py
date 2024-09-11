from flask import Blueprint, request
# import services
from app.services.clotheService import ClotheService
# import utils
from app.utils.responseHandler import ResponseHandler
from app.utils.AwsS3 import AwsBucket
from app.utils.FileNameGenerator import FileNameGenerator
# import marshmallow
from app.services.imageService import ImageService

from flask_jwt_extended import jwt_required
from app.services.authService import AuthService

from app import Config as config


clothe_service = ClotheService()

clothe_bp = Blueprint("clothe_bp", __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in config.ALLOWED_EXTENSIONS

# Post new clothe
@clothe_bp.route("/clothe", methods=["POST"])
@jwt_required()
def post_clothe():
    try:
        user_identity = AuthService().get_user_jwt_identity()
        if not AuthService().is_admin(user_identity):
            return ResponseHandler().create_error_response('Error', 'Only admins can perform this action', 403)

        name = request.form.get('name')
        description = request.form.get('description')
        id_category = request.form.get('id_category')
        id_gender = request.form.get('id_gender')
        price = request.form.get('price')

        if not all([name, description, id_category, id_gender, price]):
            return ResponseHandler().create_error_response('Error', 'Missing required fields', 400)
        
        data = clothe_service.save_clothe(name, description, price, id_gender, id_category)
        saved_clothe = data[0]
        
        response = save_colors(request, saved_clothe['id'])
        if response[0] is None:
            clothe_service.delete_clothe(saved_clothe['id'])
            return ResponseHandler().create_error_response('Error', response[1], response[2])
        
        access_token = AuthService().create_access_token(user_identity)
        refresh_token = AuthService().create_refresh_token(user_identity)
        response = {
            'access_token': access_token,
            'clothe': data[0]
        }
        return ResponseHandler().create_response('success', data[1], response, refresh_token=refresh_token, code=data[2])
        
    except Exception as e:
        return ResponseHandler().create_error_response(str(e), 'An error occurred while creating the clothe', 500)
    

def save_colors(request, id_clothe):
    color_index = 0
    has_colors = False

    while True:
        id_color = request.form.get(f'colors[{color_index}][id_color]')
        stock = request.form.get(f'colors[{color_index}][stock]')

        if not id_color:
            break

        has_colors = True
        
        color_clothe_data = clothe_service.save_clothe_color(id_color, id_clothe, stock)
        
        if color_clothe_data[0] is None:
            return color_clothe_data

        response = save_images(request, color_index, id_clothe, id_color)
        if response[0] is None:
            return response
    
        color_index += 1
    
    if not has_colors:
        return [None, 'No colors provided', 400]
    
    return [True, 'Clothe created successfully', 201]

def save_images(request, color_index, id_clothe, id_color):
    
    image_index = 0
    has_images = False
    
    while True:
        image = request.files.get(f'colors[{color_index}][images][{image_index}]')
        
        if not image:
            break
        
        has_images = True

        if allowed_file(image.filename):
            file_name_in_s3 = FileNameGenerator().generate_unique_filename(image.filename)
            # Subimos la imagen a S3
            aws_bucket = AwsBucket()
            upload_response = aws_bucket.upload_file(image, file_name_in_s3)

            if (upload_response[0] is None):
                return upload_response

            # Construimos la URL de la imagen subida en S3
            image_url = f"https://{config.AWS_BUCKET_NAME}.s3.{config.AWS_BUCKET_REGION}.amazonaws.com/{file_name_in_s3}"

            # Guardar la imagen en la base de datos
            ImageService().save_image(
                id_clothe,
                id_color,
                'hashcode',
                image_url,
                image.filename,
            )
        else:
            return [None, 'Invalid image format', 400]
        
        image_index += 1

    if not has_images:
        return [None, 'No images provided', 400]
    
    return [True, 'Clothe created successfully', 201]


# Get clothes by id
@clothe_bp.route("/clothe/<int:id_clothe>", methods=["GET"])
def get_clothe_by_id(id_clothe):
    try:
        data = clothe_service.get_clothe_by_id(id_clothe)


        if data[0] is None:
            return ResponseHandler().create_error_response('Error', data[1], data[2])

        clothe = data[0]
        
        return ResponseHandler().create_response('success', data[1], clothe, code=data[2])

    except Exception as e:
        return ResponseHandler().create_error_response('Error getting clothe', str(e), 500)


# Get clothes by category and gender
@clothe_bp.route('/clothes/<int:id_gender>/<int:id_category>/<int:page>/<int:page_size>', methods=['GET'])
def get_clothes_by_category(id_gender, id_category, page, page_size):
    try:
        data = clothe_service.get_clothes_by_category(id_gender, id_category, page, page_size)
        
        if len(data[0]['clothes']) == 0:
            return ResponseHandler().create_error_response('Clothes not found', 'No clothes found for the given category and gender', 404)

        response = {
            'id_category': id_category,
            'category_name': data[0]['category'],
            'id_gender': id_gender,
            'clothes': data[0]['clothes'],
            'pagination': data[0]['pagination']
        }
        
        return ResponseHandler().create_response('success', 'Clothes retrieved successfully', response, code=200)

    except Exception as e:
        return ResponseHandler().create_error_response('Error getting clothes', str(e), 500)
    
# Update clothe
@clothe_bp.route("/clothe", methods=["PUT"])
def update_clothe():
    try:
        id_clothe = request.get_json('id_clothe')
        name = request.get_json('name')
        description = request.get_json('description')
        price = request.get_json('price')

        data = clothe_service.update_clothe(id_clothe, name, description, price)

        if data[0] is None:
            return ResponseHandler().create_error_response('Error', data[1], data[2])

        clothe = data[0]
        return ResponseHandler().create_response('success', data[1], clothe, code=data[2])

    except Exception as e:
        return ResponseHandler().create_error_response('Error updating clothe', str(e), 500)
    
# Delete clothe
@clothe_bp.route("/clothe/<int:id_clothe>", methods=["DELETE"])
def delete_clothe(id_clothe):
    try:
        data = clothe_service.delete_clothe(id_clothe)

        if data[0]:
            return ResponseHandler().create_error_response('Error', data[1], data[2])

        return ResponseHandler().create_response('success', data[1], data[0], code=data[2])

    except Exception as e:
        return ResponseHandler().create_error_response('Error deleting clothe', str(e), 500)




