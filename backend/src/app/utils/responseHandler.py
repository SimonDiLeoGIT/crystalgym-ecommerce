from app.utils.singletonMeta import SingletonMeta
from flask import make_response, jsonify

class ResponseHandler(metaclass=SingletonMeta):

    def create_response(self, status, message, data, refresh_token=None, code=200):
        # Crear la respuesta con un JSON
        response_data = {
            "status": status,
            "message": message,
            "data": data,
            "code": code
        }
        response = make_response(jsonify(response_data))
        response.status_code = code

        if refresh_token is not None:
            response = self.set_refresh_token(response, refresh_token)
    
        return response
    
    def set_refresh_token(self, response, refresh_token):
        response.set_cookie(
            'refresh_token',
            refresh_token,
            httponly=True,
            # secure=True,
            samesite='Strict'
        )
        return response

    def create_error_response(self, status, message, code):
        response_data = {
            "error": status,
            "message": message,
            "code": code
        }
        response = make_response(jsonify(response_data))
        response.status_code = code
        
        return response