from app.repositories.clotheRepository import ClotheRepository
from app.repositories.clotheColorRepository import ClotheColorRepository
from app.repositories.colorRepository import ColorRepository
from app.repositories.clothePromoRepository import ClothePromoRepository
from app.utils.pagination import PaginationHelper
from datetime import datetime
from dateutil.relativedelta import relativedelta
from app.utils.singletonMeta import SingletonMeta

class ClotheService(metaclass=SingletonMeta):
    def __init__(self):
        self.clothe_repository = ClotheRepository()
        self.clothe_color_repository = ClotheColorRepository()
        self.color_repository = ColorRepository()
        self.clothe_promo_repository = ClothePromoRepository()
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

    def get_clothe_by_id(self, id_clothe):
        clothe = self.clothe_repository.get_clothe_by_id(id_clothe)
        if clothe is None:
            return [None, 'Clothe not found', 404]
        return [clothe.to_json(), 'Clothes retrieved successfully', 200]

    def get_clothes_by_category(self, id_gender, id_category, page=1, page_size=10):
        clothes_data = self.clothe_repository.get_clothes_by_category(id_gender, id_category, page, page_size)
        
        # Marcar como "new" y verificar promociones
        # clothes_data['clothes'] = [self.add_new_attribute(clothe) for clothe in clothes_data['clothes']]
        # clothes_data['clothes'] = [self.add_promo_attribute(clothe) for clothe in clothes_data['clothes']]

        # # Agregar los datos de paginación
        # clothes_data['pagination'] = self.pagination.get_pagination_data(page, page_size, clothes_data['total_pages'])
        print(clothes_data)
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
