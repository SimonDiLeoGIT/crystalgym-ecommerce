from app import db

class ClothePromo(db.Model):
  __tablename__ = "clothe_promos"
  id = db.Column(db.Integer, primary_key=True)
  id_clothe = db.Column(db.Integer, db.ForeignKey('clothes.id'), nullable=False)
  id_promo = db.Column(db.Integer, db.ForeignKey('promos.id'), nullable=False)
  
  def __init__(self, id_clothe, id_promo):
    self.id_clothe = id_clothe
    self.id_promo = id_promo

  def to_json(self):
    return {
      'id': self.id,
      'id_clothe': self.id_clothe,
      'id_promo': self.id_promo
    }