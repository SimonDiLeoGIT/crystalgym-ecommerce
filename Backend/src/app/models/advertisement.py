from app import db

class Advertisement(db.Model):
  __tablename__ = "advertisements"
  
  id = db.Column(db.Integer, primary_key=True)
  description = db.Column(db.String(255), nullable=False)

  def __init__(self, description):
    self.description = description