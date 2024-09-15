from app.repositories.imageRepository import ImageRepository
from app.utils.singletonMeta import SingletonMeta

class ImageService(metaclass=SingletonMeta):
    
    def __init__(self):
        self.image_repository = ImageRepository()

    def save_image(self, id_clothe, id_color, hashcode, url, name):
        image = self.image_repository.save_image(id_clothe, id_color, hashcode, url, name)
        return image.to_json()
