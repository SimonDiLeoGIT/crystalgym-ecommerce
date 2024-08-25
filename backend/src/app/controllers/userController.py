from flask import jsonify, Blueprint, request
# import services
from app.services.userService import UserService
# import utils
from app.utils.errorResponseHandler import ErrorResponseHandler
from app.utils.responseHandler import ResponseHandler
# import jwt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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
  
@user_bp.route("/users/login", methods=["POST"])
def login():
  try:
    if not request.is_json:
      return ErrorResponseHandler().create_error_response('Bad request', 'Request body must be JSON', 400)
    
    username = request.get_json().get('username')
    password = request.get_json().get('password')

    user = UserService().login(username, password)

    if user is None:
      return ErrorResponseHandler().create_error_response('User not found', 'User not found', 404)
    
    access_token = create_access_token(identity=user)

    data = {
      'access_token': access_token,
      'user': user
    }

    response = ResponseHandler().create_response('success', 'User logged in successfully', data, 200)
    return response
  except Exception as e:
    return ErrorResponseHandler().create_error_response('Error logging in user', str(e), 500)

@user_bp.route("/users/logout", methods=["POST"])
@jwt_required()
def logout():
  return 'User logged out successfully'

@user_bp.route("/users/me", methods=["GET"])
@jwt_required()
def get_current_user():
  user = get_jwt_identity()
  return jsonify(user)