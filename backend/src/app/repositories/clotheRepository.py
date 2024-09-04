from app import db
from app.models.clothe import Clothe
from app.models.type import Type
from app.models.clothe_color import ClotheColor

from app.utils.pagination import PaginationHelper

class ClotheRepository:
    def __init__(self):
        self.pagination = PaginationHelper()

    def save_clothe(self, name, description, price, release_date, id_gender, id_type):
        new_clothe = Clothe(name, description,  price, release_date, id_gender, id_type)
        db.session.add(new_clothe)
        db.session.commit()
        return new_clothe

    def get_clothes_by_category(self, id_gender, id_type, page=1, page_size=10):
        page = int(page)
        page_size = int(page_size)

        if page < 1 or page_size < 1:
            raise ValueError("Page and page size must be positive integers.")

        clothes_query = db.session.query(
            Clothe,
            Type.name.label('type_name'),
            ClotheColor.id_color
        ).join(Type, Clothe.id_type == Type.id) \
         .join(ClotheColor, Clothe.id == ClotheColor.id_clothe) \
         .filter(Clothe.id_gender == id_gender, Clothe.id_type == id_type)

        clothes = self.pagination.generate_pagination(page, page_size, clothes_query)
        total_pages = (clothes_query.count() // page_size) + 1

        response = {
            'clothes': [clothe.to_json() for clothe, type_name, color_id in clothes],
            'category': clothes[0][1] if clothes else None,
            'total_pages': total_pages
        }

        return response
