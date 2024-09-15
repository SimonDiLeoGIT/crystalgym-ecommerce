from flask import Blueprint, request
# import services
from app.services.colorService import ColorService
# import utils
from app.utils.responseHandler import ResponseHandler


color_service = ColorService()

color_bp = Blueprint("color_bp", __name__)


@color_bp.route("/colors", methods=["GET"])
def get_colors():
  data = color_service.get_colors()
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])