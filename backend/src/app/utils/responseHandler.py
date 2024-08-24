from app.utils.singletonMeta import SingletonMeta

class ResponseHandler(metaclass=SingletonMeta):
    def create_response(self, status, message, data, code):
        return {
            'status': status,
            'message': message,
            'data': data,
            'code': code
        }, code