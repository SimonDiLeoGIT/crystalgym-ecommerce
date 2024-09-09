from app import db
from app.models.type import Type

class TypeRepository:

  def get_types(self):
    types = db.session.query(Type).all()
    return types