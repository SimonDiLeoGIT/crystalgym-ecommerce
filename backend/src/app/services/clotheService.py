from app.repositories.clotheRepository import ClotheRepository
from app.repositories.clotheColorRepository import ClotheColorRepository
from app.repositories.colorRepository import ColorRepository
from app.repositories.clothePromoRepository import ClothePromoRepository
from app.repositories.imageRepository import ImageRepository
from app.utils.pagination import PaginationHelper
from datetime import datetime
from dateutil.relativedelta import relativedelta
from app.utils.singletonMeta import SingletonMeta
from app.utils.AwsS3 import AwsBucket
from app.utils.FileNameGenerator import FileNameGenerator
from app import Config as config

class ClotheService(metaclass=SingletonMeta):
    def __init__(self):
        self.clothe_repository = ClotheRepository()
        self.clothe_color_repository = ClotheColorRepository()
        self.color_repository = ColorRepository()
        self.clothe_promo_repository = ClothePromoRepository()
        self.image_repository = ImageRepository()
        self.pagination = PaginationHelper()

    def save_clothe(self, name, description, price, id_gender, id_category):
        clothe = self.clothe_repository.save_clothe(name, description, price, datetime.now(), id_gender, id_category)
        if clothe is None:
            return [None, 'Clothe already exists', 409]
        return [clothe.to_json(), 'Clothe created successfully', 201]
    
    def save_clothe_color(self, id_color, id_clothe, stock):
        if not self.clothe_repository.get_clothe_by_id(id_clothe):
            return [None, 'Clothe not found', 404]
        if self.color_repository.get_color_by_id(id_color) is None:
            return [None, 'Color not found', 404]
        self.clothe_color_repository.save_clothe_color(id_clothe, id_color, stock)
        return [True, 'success', 201]

    def save_colors(self, request, id_clothe):
        color_index = 0
        has_colors = False

        while True:
            id_color = request.form.get(f'colors[{color_index}][id_color]')
            stock = request.form.get(f'colors[{color_index}][stock]')

            if not id_color:
                break

            has_colors = True
            
            color_clothe_data = self.save_clothe_color(id_color, id_clothe, stock)
            
            if color_clothe_data[0] is None:
                return color_clothe_data

            response = self.save_images(request, color_index, id_clothe, id_color)
            if response[0] is None:
                return response
        
            color_index += 1
        
        if not has_colors:
            return [None, 'No colors provided', 400]
        
        return [True, 'Clothe created successfully', 201]
    
    def allowed_file(self, filename):
        return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in config.ALLOWED_EXTENSIONS

    def save_images(self, request, color_index, id_clothe, id_color):
        
        image_index = 0
        has_images = False
        
        while True:
            image = request.files.get(f'colors[{color_index}][images][{image_index}]')
            
            if not image:
                break
            
            has_images = True

            if self.allowed_file(image.filename):
                file_name_in_s3 = FileNameGenerator().generate_unique_filename(image.filename)
                # Subimos la imagen a S3
                aws_bucket = AwsBucket()
                upload_response = aws_bucket.upload_file(image, file_name_in_s3)

                if (upload_response[0] is None):
                    return upload_response

                # Construimos la URL de la imagen subida en S3
                image_url = f"https://{config.AWS_BUCKET_NAME}.s3.{config.AWS_BUCKET_REGION}.amazonaws.com/{file_name_in_s3}"

                # Guardar la imagen en la base de datos
                self.image_repository.save_image(
                    id_clothe,
                    id_color,
                    'hashcode',
                    image_url,
                    image.filename,
                )
            else:
                return [None, 'Invalid image format', 400]
            
            image_index += 1

        if not has_images:
            return [None, 'No images provided', 400]
        
        return [True, 'Clothe created successfully', 201]

    def get_clothe_by_id(self, id_clothe):
        clothe = self.clothe_repository.get_clothe_by_id(id_clothe)
        if clothe is None:
            return [None, 'Clothe not found', 404]
        return [clothe.to_json(), 'Clothes retrieved successfully', 200]

    def get_clothes_by_category(self, id_gender, id_category, page=1, page_size=10):
        clothes_data = self.clothe_repository.get_clothes_by_category(id_gender, id_category, page, page_size)
        
        # Marcar como "new" y verificar promociones
        clothes_data['clothes'] = [self.add_new_attribute(clothe) for clothe in clothes_data['clothes']]
        clothes_data['clothes'] = [self.add_promo_attribute(clothe) for clothe in clothes_data['clothes']]

        # Agregar los datos de paginación
        clothes_data['pagination'] = self.pagination.get_pagination_data(page, page_size, clothes_data['total_pages'])
        
        return [clothes_data, 'Clothes retrieved successfully', 200]

    def add_new_attribute(self, clothe):
        release_date = clothe['release_date']
        today = datetime.now()
        delta = relativedelta(today, release_date)
        clothe['new'] = delta.months < 1
        return clothe

    def add_promo_attribute(self, clothe):
        clothe['promo'] = self.clothe_promo_repository.has_promo_clothe(clothe['id'])
        return clothe
    
    def delete_clothe(self, id_clothe):
        if not self.clothe_repository.get_clothe_by_id(id_clothe):
            return [None, 'Clothe not found', 404]
        self.clothe_repository.delete_clothe(id_clothe)
        return [True, 'success', 200]
    
    def update_clothe(self, id_clothe, name, description, price):
        if not self.clothe_repository.get_clothe_by_id(id_clothe):
            return [None, 'Clothe not found', 404]
        
        self.clothe_repository.update_clothe(id_clothe, name, description, price)
        
        new_clothe = self.clothe_repository.get_clothe_by_id(id_clothe)
        
        return [new_clothe.to_json(), 'success', 200]
