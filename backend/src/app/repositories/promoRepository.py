from app.models.promo import Promo

class PromoRepository:
  def __init__(self):
    pass

  def has_promo_clothe(self, id_clothe):
    return Promo.query.filter_by(id_clothe=id_clothe).count() > 0