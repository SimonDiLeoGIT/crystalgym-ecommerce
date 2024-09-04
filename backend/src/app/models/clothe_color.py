from app import db

class ClotheColor(db.Model):
  __tablename__ = "clothe_colors"
  id = db.Column(db.Integer, primary_key=True)
  id_clothe = db.Column(db.Integer, db.ForeignKey('clothes.id'), nullable=False)
  id_color = db.Column(db.Integer, db.ForeignKey('colors.id'), nullable=False)
  stock = db.Column(db.Integer, nullable=False)
  price = db.Column(db.Double, nullable=False)

  def __init__(self, id_clothe, id_color, stock):
    self.id_clothe = id_clothe
    self.id_color = id_color
    self.stock = stock