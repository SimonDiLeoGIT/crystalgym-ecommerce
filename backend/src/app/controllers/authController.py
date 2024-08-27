from flask import jsonify, Blueprint, request

# import services
from app.services.authService import AuthService
# import utils
from app.utils.responseHandler import ResponseHandler
# import jwt
from flask_jwt_extended import jwt_required

auth_bp = Blueprint("auth_bp", __name__)

  
@auth_bp.route("/auth/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
  try:
    user_identity = AuthService().get_user_jwt_identity()

    access_token = AuthService().create_access_token(user_identity)
    refresh_token = AuthService().create_refresh_token(user_identity)

    data = {
      'access_token': access_token,
      'user': user_identity
    }

    response = ResponseHandler().create_response('success', 'User logged in successfully', data, refresh_token=refresh_token, code=200)
    return response
  except Exception as e:
    return ResponseHandler().create_error_response('Error refreshing access token', str(e), 500)