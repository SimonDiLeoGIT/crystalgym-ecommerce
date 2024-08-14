from app import db

class Type(db.Model):
  __tablename__ = "types"
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  def __init__(self, name):
    self.name = name