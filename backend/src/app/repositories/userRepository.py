from app import db
from app.models.user import User

class UserRepository:

  def __init__(self):
    pass

  def save_user(self, username, password, email, id_role):
    if self.exists_username(username):
      raise ValueError("Username already exists")
    if self.exists_email(email):
      raise ValueError("Email already exists")
    user = User(username, password, email, id_role)
    db.session.add(user)
    db.session.commit()
    return user.to_json()
  
  def get_user_by_username(self, username):
    user = User.query.filter_by(username=username).first()
    db.session.commit()
    return user

  def exists_username(self, username):
    user = User.query.filter_by(username=username).count()
    db.session.commit()
    return user > 0
  
  def exists_email(self, email):
    user = User.query.filter_by(email=email).count()
    db.session.commit()
    return user > 0