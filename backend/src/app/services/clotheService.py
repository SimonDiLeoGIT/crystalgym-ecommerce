from app.repositories.clotheRepository import ClotheRepository
from app.repositories.clothePromoRepository import ClothePromoRepository
from app.utils.pagination import PaginationHelper
from datetime import datetime
from dateutil.relativedelta import relativedelta

class ClotheService:
    def __init__(self):
        self.clothe_repository = ClotheRepository()
        self.clothe_promo_repository = ClothePromoRepository()
        self.pagination = PaginationHelper()

    def get_clothes_by_category(self, id_gender, id_category, page, total_items):
        clothes_data = self.clothe_repository.get_clothes_by_category(id_gender, id_category, page, total_items)

        # Marcar como "new" y verificar promociones
        clothes_data['clothes'] = [self.add_new_attribute(clothe) for clothe in clothes_data['clothes']]
        clothes_data['clothes'] = [self.add_promo_attribute(clothe) for clothe in clothes_data['clothes']]

        # Agregar los datos de paginación
        clothes_data['pagination'] = self.pagination.get_pagination_data(page, total_items, clothes_data['total_pages'])

        return clothes_data

    def add_new_attribute(self, clothe):
        release_date = clothe['release_date']
        today = datetime.now()
        delta = relativedelta(today, release_date)
        clothe['new'] = delta.months < 1
        return clothe

    def add_promo_attribute(self, clothe):
        clothe['promo'] = self.clothe_promo_repository.has_promo_clothe(clothe['id'])
        return clothe
