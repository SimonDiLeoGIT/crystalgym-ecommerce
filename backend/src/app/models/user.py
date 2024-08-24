from app import db

class User(db.Model):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(255), nullable=False, unique=True)
  password = db.Column(db.String(255), nullable=False)
  email = db.Column(db.String(255), nullable=False, unique=True)
  id_role = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)

  def __init__(self, username, password, email, id_role):
    self.username = username
    self.password = password
    self.email = email
    self.id_role = id_role

  def to_json(self):
    return {
      'id': self.id,
      'username': self.username,
      'email': self.email
    }
