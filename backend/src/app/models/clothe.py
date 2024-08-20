from app import db

class Clothe(db.Model):
  __tablename__ = "clothes"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  price = db.Column(db.Double, nullable=False)
  release_date = db.Column(db.Date, nullable=False)
  id_gender = db.Column(db.Integer, db.ForeignKey('genders.id'), nullable=False)
  id_type = db.Column(db.Integer, db.ForeignKey('types.id'), nullable=False)
  id_promo = db.Column(db.Integer, db.ForeignKey('promos.id'), nullable=True)
  
  def __init__(self, name, price, release_date, id_gender, id_type):
    self.name = name
    self.price = price
    self.release_date = release_date
    self.id_gender = id_gender
    self.id_type = id_type

  def to_json(self):
    return {
        'id': self.id,
        'name': self.name,
        'price': self.price,
        'release_date': self.release_date,
        'id_gender': self.id_gender,
        'id_type': self.id_type,
        'id_promo': self.id_promo
      }