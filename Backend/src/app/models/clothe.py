from app import db

class Clothe(db.Model):
  __tablename__ = "clothes"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  stock = db.Column(db.Integer, nullable=False)
  price = db.Column(db.Double, nullable=False)
  release_date = db.Column(db.Date, nullable=False)
  id_gender = db.Column(db.Integer, db.ForeignKey('genders.id'), nullable=False)
  id_color = db.Column(db.Integer, db.ForeignKey('colors.id'), nullable=False)
  id_type = db.Column(db.Integer, db.ForeignKey('types.id'), nullable=False)
  
  def __init__(self, name, stock, price, release_date, id_gender, id_color, id_type):
    self.name = name
    self.stock = stock
    self.price = price
    self.release_date = release_date
    self.id_gender = id_gender
    self.id_color = id_color
    self.id_type = id_type