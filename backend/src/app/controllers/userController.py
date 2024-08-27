from flask import jsonify, Blueprint, request

# import services
from app.services.userService import UserService
from app.services.authService import AuthService
# import utils
from app.utils.responseHandler import ResponseHandler
# import jwt
from flask_jwt_extended import jwt_required

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/users/register", methods=["POST"])
def register():
  try:
    if not request.is_json:
      return ResponseHandler().create_error_response('Bad request', 'Request body must be JSON', 400)
    
    username = request.get_json().get('username')
    password = request.get_json().get('password')
    email = request.get_json().get('email')

    user = UserService().register(username, password, email)

    if user is None:
      return ResponseHandler().create_error_response('User already exists', 'User already exists', 409)

    response = ResponseHandler().create_response('success', 'User registered successfully', user, code=201)
    return response
  except Exception as e:
    return ResponseHandler().create_error_response('Error registering user', str(e), 500)
  
@user_bp.route("/users/login", methods=["POST"])
def login():
  try:
    if not request.is_json:
      return ResponseHandler().create_error_response('Bad request', 'Request body must be JSON', 400)
    
    username = request.get_json().get('username')
    password = request.get_json().get('password')

    user = UserService().login(username, password)

    if user is None:
      return ResponseHandler().create_error_response('User not found', 'User not found', 404)

    access_token = AuthService().create_access_token(user)
    refresh_token = AuthService().crete_refresh_token(user)

    data = {
      'access_token': access_token,
      'user': user
    }

    response = ResponseHandler().create_response('success', 'User logged in successfully', data, refresh_token=refresh_token, code=200)
    return response
  except Exception as e:
    return ResponseHandler().create_error_response('Error logging in user', str(e), 500)

@user_bp.route("/users/logout", methods=["POST"])
@jwt_required()
def logout():
  return 'User logged out successfully'

@user_bp.route("/users/me", methods=["GET"])
@jwt_required()
def get_current_user():
  
  user_identity = AuthService().get_user_jwt_identity()

  access_token = AuthService().create_access_token(user_identity)
  refresh_token = AuthService().crete_refresh_token(user_identity)

  data = {
    'access_token': access_token,
    'user': user_identity
  }

  response = ResponseHandler().create_response('success', 'User logged in successfully', data, refresh_token=refresh_token, code=200)
  return response