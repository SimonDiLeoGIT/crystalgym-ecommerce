from app import db
from app.models.image import Image

class ImageRepository:
    
    def __init__(self):
        pass

    def save_image(self, id_clothe, id_color, hashcode, url, name):
        new_image = Image(id_clothe, id_color, hashcode, url, name)
        db.session.add(new_image)
        db.session.commit()
        return new_image
