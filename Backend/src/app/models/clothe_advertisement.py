from app import db

class ClotheAdvertisement(db.Model):
  __tablename__ = "clothe_advertisements"

  id = db.Column(db.Integer, primary_key=True)
  id_clothe = db.Column(db.Integer, db.ForeignKey('clothes.id'), nullable=False)
  id_advertisement = db.Column(db.Integer, db.ForeignKey('advertisements.id'), nullable=False)

  def __init__(self, id_clothe, id_advertisement):
    self.id_clothe = id_clothe
    self.id_advertisement = id_advertisement