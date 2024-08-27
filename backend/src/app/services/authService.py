from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

class AuthService:
    def __init__(self):
      pass

    def create_access_token(self, user):
      access_token = create_access_token(identity=user)
      return access_token
    
    def crete_refresh_token(self, user):
      refresh_token = create_refresh_token(identity=user)
      return refresh_token
    
    def get_user_jwt_identity(self):
      return get_jwt_identity()