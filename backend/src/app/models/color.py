from app import db

class Color(db.Model):
  __tablename__ = "colors"
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  def __init__(self, name):
    self.name = name

  def to_json(self):
    return {
      "id": self.id,
      "name": self.name
    }