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
            color_id = request.form.get(f'colors[{color}][id_color]')
            stock = request.form.get(f'colors[{color}][stock]')
            images = request.files.getlist(f'colors[{color}][images]')

            for image_file in images:
                if image_file and allowed_file(image_file.filename):
                    ImageService.save_image(
                        saved_clothe['id'],
                        color_id,
                        image_file.filename,
                        image_file
                    )

        data = ResponseHandler().make_data({})
        return ResponseHandler().create_response('success', 'Clothe created successfully', data['data'], refresh_token=data['refresh_token'], code=201)
        
    except Exception as e:
        print (e)
        return ResponseHandler().create_error_response(str(e), 'An error occurred while creating the clothe', 500)

# Get clothes by category and gender
@clothe_bp.route("/clothes/<int:id_gender>/<int:id_category>/<int:page>/<int:total_items>", methods=["GET"])
def get_clothes(id_gender, id_category, page, total_items):
    try:
        clothes = clothe_service.get_clothes_by_category(id_gender, id_category, page, total_items)

        if not clothes['clothes']:
            return ResponseHandler().create_error_response('Clothes not found', 'No clothes found for the given category and gender', 404)

        # Generate response
        response = {
            'id_category': id_category,
            'category_name': clothes['category'],
            'id_gender': id_gender,
            'clothes': clothes['clothes'],
            'pagination': clothes['pagination']
        }
        return jsonify(response), 200

    except Exception as e:
        return ResponseHandler().create_error_response('Error getting clothes', str(e), 500)



