from app import db
from app.models.gender import Gender

class GenderRepository:

  def get_gender_by_id(self, id_gender):
    return db.session.query(Gender).filter(Gender.id == id_gender).first()

  def get_genders(self):
    return db.session.query(Gender).all()

  def save_gender(self, name):
    gender = gender(name)
    db.session.add(gender)
    db.session.commit()
    return gender