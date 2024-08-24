from app import db
from app.models.user import User

class UserRepository:

  def __init__(self):
    pass

  def save_user(self, username, password, email, id_role):
    user = User(username, password, email, id_role)
    db.session.add(user)
    db.session.commit()
    return user.to_json()
  
  def get_user_by_username(self, username):
    user = User.query.filter_by(username=username).count()
    db.session.commit()
    return user > 0
  
  def get_user_by_email(self, email):
    user = User.query.filter_by(email=email).count()
    db.session.commit()
    return user > 0