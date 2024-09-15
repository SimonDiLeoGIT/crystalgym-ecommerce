from app.utils.singletonMeta import SingletonMeta
from app.repositories.genderRepository import GenderRepository

class GenderService(metaclass=SingletonMeta):

  def __init__(self):
    self.gender_repository = GenderRepository()

  def get_genders(self):
    genders = self.gender_repository.get_genders()
    if genders is None:
      return [None, 'Genders not found', 404]
    
    genders_json = [gender.to_json() for gender in genders]
    return [genders_json, 'Genders retrieved successfully', 200]