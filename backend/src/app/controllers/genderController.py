from flask import Blueprint, request
# import services
from app.services.genderService import GenderService
# import utils
from app.utils.responseHandler import ResponseHandler


gender_service = GenderService()

gender_bp = Blueprint("gender_bp", __name__)


@gender_bp.route("/genders", methods=["GET"])
def get_genders():
  data = gender_service.get_genders()
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])