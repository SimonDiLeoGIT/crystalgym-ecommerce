from app import db
from app.models.clothe import Clothe
from app.models.type import Type
from app.models.clothe_color import ClotheColor
from app.services.pagination import PaginationHelper

pagination = PaginationHelper()

#getByClothesByCategory
def getClothesByCategory(id_gender, id_type, page=1, page_size=10):
    try:
        page = int(page)
        page_size = int(page_size)
        if page < 1 or page_size < 1:
            raise ValueError("Page and page size must be positive integers.")
    except ValueError as e:
        return {'error': 'Invalid page or page size', 'message': str(e), 'code': 400}, 400

    # Calcular offset
    offset = (page - 1) * page_size

    # Obtener los ítems con paginación
    clothes_query = db.session.query(
        Clothe,
        Type.name.label('type_name'),
        ClotheColor.id_color
    ).join(Type, Clothe.id_type == Type.id) \
     .join(ClotheColor, Clothe.id == ClotheColor.id_clothe) \
     .filter(Clothe.id_gender == id_gender, Clothe.id_type == id_type)
    
    clothes = pagination.generate_pagination(page, page_size, clothes_query)

    total_pages = clothes_query.count() // page_size + 1
    
    response = {
        'clothes': [clothe.to_json() for clothe, type_name, color_id in clothes],
        'category': clothes[0][1] if clothes else None,  # Para manejar el caso de que no haya resultados
        'total_pages': total_pages
    }
    
    return response