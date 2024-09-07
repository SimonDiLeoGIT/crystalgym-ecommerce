from flask import jsonify, Blueprint, request
# import services
from app.services.clotheService import ClotheService
# import utils
from app.utils.pagination import PaginationHelper
from app.utils.responseHandler import ResponseHandler
# import marshmallow
from app.services.imageService import ImageService
from marshmallow import ValidationError

from app import Config as config


clothe_service = ClotheService()

clothe_bp = Blueprint("clothe_bp", __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in config.ALLOWED_EXTENSIONS

# Post new clothe
@clothe_bp.route("/clothe", methods=["POST"])
def post_clothe():
    try:

        name = request.form.get('name')
        description = request.form.get('description')
        id_category = request.form.get('id_category')
        id_gender = request.form.get('id_gender')
        price = request.form.get('price')
        
        saved_clothe = clothe_service.save_clothe(name, description, price, id_gender, id_category)

        colors = request.form.getlist('colors')
        for color in colors:
            id_color = request.form.get(f'colors[{color}][id_color]')
            stock = request.form.get(f'colors[{color}][stock]')
            images = request.files.getlist(f'colors[{color}][images]')
            color_clothe_data = clothe_service.save_color(id_color, saved_clothe['id'], stock)

            if color_clothe_data[0] is None:
                return ResponseHandler().create_error_response('Error', color_clothe_data[1], color_clothe_data[2])

            for image_file in images:
                if image_file and allowed_file(image_file.filename):
                    ImageService.save_image(
                        saved_clothe['id'],
                        id_color,
                        image_file.filename,
                        image_file
                    )

        data = ResponseHandler().make_data({})
        return ResponseHandler().create_response('success', 'Clothe created successfully', data['data'], refresh_token=data['refresh_token'], code=201)
        
    except Exception as e:
        print (e)
        return ResponseHandler().create_error_response(str(e), 'An error occurred while creating the clothe', 500)

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
@clothe_bp.route("/clothes/<int:id_gender>/<int:id_category>/<int:page>/<int:total_items>", methods=["GET"])
def get_clothes_by_category(id_gender, id_category, page, total_items):
    try:
        data = clothe_service.get_clothes_by_category(id_gender, id_category, page, total_items)
        if data is None:
            return ResponseHandler().create_error_response('Error', 'Error getting clothes', 404)
        return ResponseHandler().create_response('success', 'Clothes retrieved successfully', data, code=200)
        if len(data[0]['clothes']) == 0:
            return ResponseHandler().create_error_response('Clothes not found', 'No clothes found for the given category and gender', 404)

        # Generate response
        response = {
            'id_category': id_category,
            'category_name': data['category'],
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




