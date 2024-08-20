from app import db
from app.models.clothe import Clothe
from app.models.type import Type

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
    clothes_query = db.session.query(Clothe, Type.name.label('type_name')).join(Type, Clothe.id_type == Type.id).filter(Clothe.id_gender == id_gender, Clothe.id_type == id_type)
    clothes = clothes_query.offset(offset).limit(page_size).all()
    
    response = {
        'clothes': [clothe.to_json() for clothe, type_name in clothes],
        'category': clothes[0][1] if clothes else None  # Para manejar el caso de que no haya resultados
    }
    
    return response