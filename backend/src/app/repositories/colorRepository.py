from app import db
from app.models.color import Color

class ColorRepository:

  def get_color_by_id(self, id_color):
    return db.session.query(Color).filter(Color.id == id_color).first()

  def get_colors(self):
    return db.session.query(Color).all()

  def save_color(self, name):
    color = Color(name)
    db.session.add(color)
    db.session.commit()
    return color