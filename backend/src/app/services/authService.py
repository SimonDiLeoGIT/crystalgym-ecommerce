from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity
from app.utils.singletonMeta import SingletonMeta

class AuthService(metaclass=SingletonMeta):

    def create_access_token(self, user):
      access_token = create_access_token(identity=user)
      return access_token
    
    def create_refresh_token(self, user):
      refresh_token = create_refresh_token(identity=user)
      return refresh_token
    
    def get_user_jwt_identity(self):
      return get_jwt_identity()