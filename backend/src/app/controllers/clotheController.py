from flask import request, jsonify, Blueprint # type: ignore
from app.repositories.clotheRepository import getClothesByCategory
from datetime import datetime
from dateutil.relativedelta import relativedelta # type: ignore

clothe_bp = Blueprint("clothe_bp", __name__)

# Get clothes by category and gender
@clothe_bp.route("/clothes/<id_gender>/<id_category>/<page>/<total_items>", methods=["GET"])
def getClothes(id_gender, id_category, page, total_items):
    try:
        clothes = getClothesByCategory(id_gender, id_category, page, total_items)
        if not clothes:  # Verifica si la lista está vacía
            return jsonify({'error': 'Clothes not found', 'message': 'No clothes found for the given category and gender', 'code': 404}), 404
        
        for clothe in clothes['clothes']:
            release_date = clothe['release_date']
            today = datetime.now()
            delta = relativedelta(today, release_date)
            if delta.months < 1:
                clothe['new'] = True
            else:
                clothe['new'] = False

        pagination = {
            'current_page': page,
            'offset': int(page)*int(total_items),
            'total_items': total_items,
            'total_pages': 0,
            'next_page_url': int(page)+1,
            'prev_page_url': int(page)-1
        }

        response = {
            'id_category': id_category,
            'category_name': clothes['category'],
            'id_gender': id_gender,
            'clothes': clothes['clothes'],
            'pagination': pagination
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': 'Error getting clothes', 'message': str(e), 'code': 500}), 500


# #getById
# @clothe_bp.route("/clothes/<id_clothe>/<id_color>", methods=["GET"])
# def getClothe():
#   return jsonify({})