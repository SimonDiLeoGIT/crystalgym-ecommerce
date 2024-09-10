from app import db

class Gender(db.Model):
  __tablename__ = "genders"
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(1), nullable=False)
  description = db.Column(db.String(255), nullable=True)

  def __init__(self, name, description):
    self.name = name
    self.description = description

  def to_json(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description
    }