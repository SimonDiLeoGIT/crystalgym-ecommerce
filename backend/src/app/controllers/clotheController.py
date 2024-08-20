from flask import request, jsonify, Blueprint # type: ignore
from app.repositories.clotheRepository import getClothesByCategory
from datetime import datetime
from dateutil.relativedelta import relativedelta # type: ignore
# import services
from app.services.errorResponseHandler import ErrorResponseHandler
from app.services.pagination import PaginationHelper

error_handler = ErrorResponseHandler()
pagination = PaginationHelper()

clothe_bp = Blueprint("clothe_bp", __name__)

# Get clothes by category and gender
@clothe_bp.route("/clothes/<int:id_gender>/<int:id_category>/<int:page>/<int:total_items>", methods=["GET"])
def get_clothes(id_gender, id_category, page, total_items):
    try:
        clothes = getClothesByCategory(id_gender, id_category, page, total_items)
        
        if not clothes['clothes']:
            return error_handler.create_error_response('Clothes not found', 'No clothes found for the given category and gender', 404)
        
        # Procesar y marcar ropa nueva
        clothes['clothes'] = [add_new_atribute(clothe) for clothe in clothes['clothes']]

        # Generar datos de paginación
        paginationData = pagination.get_pagination_data(page, total_items, clothes['total_pages'])

        response = {
            'id_category': id_category,
            'category_name': clothes['category'],
            'id_gender': id_gender,
            'clothes': clothes['clothes'],
            'pagination': paginationData
        }

        return jsonify(response), 200
    except Exception as e:
        return error_handler.create_error_response('Error getting clothes', str(e), 500)


def add_new_atribute(clothe):
    release_date = clothe['release_date']
    today = datetime.now()
    delta = relativedelta(today, release_date)
    clothe['new'] = delta.months < 1
    return clothe


# #getById
# @clothe_bp.route("/clothes/<id_clothe>/<id_color>", methods=["GET"])
# def getClothe():
#   return jsonify({})