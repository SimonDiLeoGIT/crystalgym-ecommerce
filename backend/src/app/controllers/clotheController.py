from flask import jsonify, Blueprint
# import services
from app.services.clotheService import ClotheService
# import utils
from app.utils.pagination import PaginationHelper
from app.utils.responseHandler import ResponseHandler


clothe_service = ClotheService()

clothe_bp = Blueprint("clothe_bp", __name__)

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



