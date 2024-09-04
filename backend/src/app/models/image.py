from app import db

class Image(db.Model):
  __tablename__ = "images"

  id = db.Column(db.Integer, primary_key=True)
  id_clothe = db.Column(db.Integer, db.ForeignKey('clothes.id'), nullable=False)
  id_color = db.Column(db.Integer, db.ForeignKey('colors.id'), nullable=False)
  hashcode = db.Column(db.String(255), nullable=False)
  url = db.Column(db.String(255), nullable=False)
  name = db.Column(db.String(255), nullable=False)

  def __init__(self, id_clothe, id_color, hashcode, url, name):
    self.id_clothe = id_clothe
    self.id_color = id_color
    self.hashcode = hashcode
    self.url = url
    self.name = name

  def to_json(self):
    return {
      'id': self.id,
      'id_clothe': self.id_clothe,
      'id_color': self.id_color,
      'hashcode': self.hashcode,
      'url': self.url,
      'name': self.name
    }