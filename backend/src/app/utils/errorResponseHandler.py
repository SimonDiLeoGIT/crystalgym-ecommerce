from app.utils.singletonMeta import SingletonMeta

class ErrorResponseHandler(metaclass=SingletonMeta):
    def create_error_response(self, error, message, code):
        return {
            'error': error,
            'message': message,
            'code': code
        }, code