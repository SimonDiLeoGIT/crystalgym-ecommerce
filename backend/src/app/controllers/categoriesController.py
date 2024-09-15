from flask import Blueprint, request
# import services
from app.services.typeService import TypeService
# import utils
from app.utils.responseHandler import ResponseHandler
# import marshmallow
from app.services.imageService import ImageService

from app import Config as config


type_service = TypeService()

type_bp = Blueprint("type_bp", __name__)


@type_bp.route("/categories", methods=["GET"])
def get_categories():
  data = type_service.get_categories()
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])