from app import db

class Order(db.Model):
  __tablename__ = "orders"

  id = db.Column(db.Integer, primary_key=True)
  id_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  total = db.Column(db.Double, nullable=False)
  date = db.Column(db.Date, nullable=False)

  def __init__(self, id_user, total, date):
    self.id_user = id_user
    self.total = total
    self.date = date