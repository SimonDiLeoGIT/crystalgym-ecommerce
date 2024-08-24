from flask import jsonify, Blueprint, request
# import services
from app.services.userService import UserService
# import utils
from app.utils.errorResponseHandler import ErrorResponseHandler


user_bp = Blueprint("user_bp", __name__)


@user_bp.route("/users/register", methods=["POST"])
def register():
  try:
    if request.is_json:
      return ErrorResponseHandler().create_error_response('Bad request', 'Request body must not be JSON', 400)
    
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    
    user = UserService().register(username, password, email)

    if user is None:
      return ErrorResponseHandler().create_error_response('User already exists', 'User already exists', 409)

    return jsonify(user), 201 
  except Exception as e:
    return ErrorResponseHandler().create_error_response('Error registering user', str(e), 500)