from app import db

class Promo(db.Model):
  __tablename__ = "promos"
  
  id = db.Column(db.Integer, primary_key=True)
  promo = db.Column(db.Double, nullable=False)

  def __init__(self, promo):
    self.promo = promo