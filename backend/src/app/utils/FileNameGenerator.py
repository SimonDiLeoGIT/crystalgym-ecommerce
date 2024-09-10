import uuid
from app.utils.singletonMeta import SingletonMeta

class FileNameGenerator(metaclass=SingletonMeta):

  def generate_unique_filename(self, filename):
      unique_filename = f"{uuid.uuid4().hex}_{filename}"
      return unique_filename