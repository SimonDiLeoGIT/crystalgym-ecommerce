from app.utils.singletonMeta import SingletonMeta
from app.repositories.colorRepository import ColorRepository

class ColorService(metaclass=SingletonMeta):

  def __init__(self):
    self.color_repository = ColorRepository()

  def get_colors(self):
    colors = self.color_repository.get_colors()
    if colors is None:
      return [None, 'Colors not found', 404]
    
    colors_json = [color.to_json() for color in colors]
    return [colors_json, 'Colors retrieved successfully', 200]