from app import db

class RoleUser(db.Model):
  __tablename__ = "role_user"
  id = db.Column(db.Integer, primary_key=True)
  id_role = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
  id_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  def __init__(self, id_role, id_user):
    self.id_role = id_role
    self.id_user = id_user

  def to_json(self):
    return {
      'id': self.id,
      'id_role': self.id_role,
      'id_user': self.id_user
    }