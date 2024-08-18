from app import db
from app.models.clothe import Clothe

#getByClothesByCategory
def getByClothesByCategory(id_gender, id_type):
  return db.session.query(Clothe).filter(Clothe.id_gender == id_gender).filter(Clothe.id_type == id_type)