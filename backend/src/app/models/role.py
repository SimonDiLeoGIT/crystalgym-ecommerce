from app import db

class Role(db.Model):
  __tablename__ = "roles"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  
  def __init__(self, name, description):
    self.name = name
    self.description = description