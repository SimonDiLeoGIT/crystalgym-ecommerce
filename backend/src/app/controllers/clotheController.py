from flask import request, jsonify, Blueprint
from app.repositories.clotheRepository import getByClothesByCategory

clothe_bp = Blueprint("clothe_bp", __name__)

#getByCategory
@clothe_bp.route("/clothes/<id_gender>/<id_category>", methods=["GET"])
def getClothes(id_gender, id_category):
  clothes = getByClothesByCategory(id_gender, id_category);
  response = [clothe.to_dict() for clothe in clothes]
  return jsonify(response), 200

#getById
@clothe_bp.route("/clothes/<id_clothe>/<id_color>", methods=["GET"])
def getClothe():
  return jsonify({})