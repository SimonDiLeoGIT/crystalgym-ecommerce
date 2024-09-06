from app import db

class Clothe(db.Model):
  __tablename__ = "clothes"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  price = db.Column(db.Double, nullable=True, default=0.0)
  release_date = db.Column(db.Date, nullable=False)
  id_gender = db.Column(db.Integer, db.ForeignKey('genders.id'), nullable=False)
  id_type = db.Column(db.Integer, db.ForeignKey('types.id'), nullable=False)
  
  def __init__(self, name, description,  price, release_date, id_gender, id_type):
    self.name = name
    self.description = description
    self.price = price
    self.release_date = release_date
    self.id_gender = id_gender
    self.id_type = id_type

  def to_json(self):
    return {
        'id': self.id,
        'name': self.name,
        'description': self.description,
        'price': self.price,
        'release_date': self.release_date,
        'id_gender': self.id_gender,
        'id_type': self.id_type
      }