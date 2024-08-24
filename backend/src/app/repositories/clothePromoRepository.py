from app import db
from app.models.clothe_promo import ClothePromo

class ClothePromoRepository:
    def __init__(self):
        pass

    def has_promo_clothe(self, id_clothe):
        return ClothePromo.query.filter_by(id_clothe=id_clothe).count() > 0

    def get_promos_for_clothe(self, id_clothe):
        return ClothePromo.query.filter_by(id_clothe=id_clothe).all()

    def add_promo_to_clothe(self, id_clothe, id_promo):
        new_clothe_promo = ClothePromo(id_clothe=id_clothe, id_promo=id_promo)
        db.session.add(new_clothe_promo)
        db.session.commit()

    def remove_promo_from_clothe(self, id_clothe, id_promo):
        ClothePromo.query.filter_by(id_clothe=id_clothe, id_promo=id_promo).delete()
        db.session.commit()
