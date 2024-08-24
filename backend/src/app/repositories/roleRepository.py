from app import db
from app.models.role import Role

class RoleRepository:

  def __init__(self):
    pass

  def get_user_called_role(self):
    role = Role.query.filter_by(name="user").first()
    db.session.commit()
    return role