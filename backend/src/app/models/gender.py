from app import db

class Gender(db.Model):
  __tablename__ = "genders"
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(1), nullable=False)

  def __init__(self, name):
    self.name = name

  def to_json(self):
    return {
      'id': self.id,
      'name': self.name
    }