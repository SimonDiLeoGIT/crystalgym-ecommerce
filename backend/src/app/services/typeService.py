from app.utils.singletonMeta import SingletonMeta
from app.repositories.typeRepository import TypeRepository

class TypeService(metaclass=SingletonMeta):

  def __init__(self):
    self.type_repository = TypeRepository()

  def get_categories(self):
    categories = self.type_repository.get_types()
    if categories is None:
      return [None, 'Categories not found', 404]
    
    categories_json = [category.to_json() for category in categories]
    return [categories_json, 'Categories retrieved successfully', 200]