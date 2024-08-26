from flask import jsonify, Blueprint, request

# import services
# import utils
from app.utils.errorResponseHandler import ErrorResponseHandler
from app.utils.responseHandler import ResponseHandler
# import jwt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

auth_bp = Blueprint("user_bp", __name__)

  
@auth_bp.route("/auth/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
  try:
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return ResponseHandler().create_response('success', 'Access Token refreshed successfully', {"access_token": access_token} , 200)
  except Exception as e:
    return ErrorResponseHandler().create_error_response('Error refreshing access token', str(e), 500)