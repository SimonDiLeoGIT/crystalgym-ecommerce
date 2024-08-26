from app.utils.singletonMeta import SingletonMeta
from flask import make_response

class ResponseHandler(metaclass=SingletonMeta):
    def create_response(self, status, message, data, code):
        return {
            'status': status,
            'message': message,
            'data': data,
            'code': code
        }, code
    
    def create_protected_response(self, status, message, data, code):
        # Crear la respuesta básica
        response_data, status_code = self.create_response(status, message, data, code)
        
        # Crear el objeto Response con el cuerpo de la respuesta
        response = make_response(response_data)
        response.headers['Content-Type'] = 'application/json'
        
        # Establecer la cookie para el token de refresco
        response.set_cookie(
            'refresh_token',
            data.get('refresh_token'),
            httponly=True,
            secure=True,
            samesite='Strict'
        )
        
        # Devolver la respuesta final
        response.status_code = status_code
        return response