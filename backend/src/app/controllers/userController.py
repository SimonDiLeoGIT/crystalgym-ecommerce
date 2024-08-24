from flask import jsonify, Blueprint, request
# import services
from app.services.userService import UserService
# import utils
from app.utils.errorResponseHandler import ErrorResponseHandler
from app.utils.responseHandler import ResponseHandler


user_bp = Blueprint("user_bp", __name__)


@user_bp.route("/users/register", methods=["POST"])
def register():
  try:
    if not request.is_json:
      return ErrorResponseHandler().create_error_response('Bad request', 'Request body must be JSON', 400)
    
    username = request.get_json().get('username')
    password = request.get_json().get('password')
    email = request.get_json().get('email')
    
    user = UserService().register(username, password, email)

    if user is None:
      return ErrorResponseHandler().create_error_response('User already exists', 'User already exists', 409)

    response = ResponseHandler().create_response('success', 'User registered successfully', user, 201)
    return response
  except Exception as e:
    return ErrorResponseHandler().create_error_response('Error registering user', str(e), 500)