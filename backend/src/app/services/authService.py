from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity

class AuthService:

    @staticmethod
    def create_access_token(user):
      access_token = create_access_token(identity=user)
      return access_token
    
    @staticmethod
    def crete_refresh_token(user):
      refresh_token = create_refresh_token(identity=user)
      return refresh_token
    
    @staticmethod
    def get_user_jwt_identity():
      return get_jwt_identity()