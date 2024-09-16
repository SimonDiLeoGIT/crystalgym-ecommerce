from app.utils.singletonMeta import SingletonMeta
from app.repositories.typeRepository import TypeRepository
from app.utils.pagination import PaginationHelper

class TypeService(metaclass=SingletonMeta):

  def __init__(self):
    self.type_repository = TypeRepository()
    self.pagination = PaginationHelper()

  def get_categories(self):
    categories = self.type_repository.get_types()
    if categories is None:
      return [None, 'Categories not found', 404]
    
    categories_json = [category.to_json() for category in categories]
    return [categories_json, 'Categories retrieved successfully', 200]
  
  def get_paginated_categories(self, page=1, page_size=10):
    categories = self.type_repository.get_paginated_types(page, page_size)
    if categories is None:
      return [None, 'Categories not found', 404]
    
    return [categories, 'Categories retrieved successfully', 200]