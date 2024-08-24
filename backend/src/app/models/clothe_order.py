from app import db

class ClotheOrder(db.Model):
  __tablename__ = "clothe_orders"

  id = db.Column(db.Integer, primary_key=True)
  id_clothe = db.Column(db.Integer, db.ForeignKey('clothes.id'), nullable=False)
  id_order = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
  price = db.Column(db.Double, nullable=False)
  quantity =  db.Column(db.Integer, nullable=False)

  def __init__(self, id_clothe, id_order, price, quantity):
    self.id_clothe = id_clothe
    self.id_order = id_order
    self.price = price
    self.quantity = quantity