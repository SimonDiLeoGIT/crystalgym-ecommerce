from app import db
from app.models.clothe_color import ClotheColor

class ClotheColorRepository:
  
  def save_clothe_color(self, id_clothe, id_color, stock):
    new_clothe_color = ClotheColor(id_clothe, id_color, stock)
    db.session.add(new_clothe_color)
    db.session.commit()
    return new_clothe_color
  
  def get_clothe_colors(self, id_clothe):
    clothe_colors = ClotheColor.query.filter_by(id_clothe=id_clothe).all()
    db.session.commit()
    return clothe_colors
  
  def get_clothe_color(self, id_clothe, id_color):
    clothe_color = ClotheColor.query.filter_by(id_clothe=id_clothe, id_color=id_color).first()
    db.session.commit()
    return clothe_color
  
  def remove_clothe_color(self, id_clothe, id_color):
    clothe_color = self.get_clothe_color(id_clothe, id_color)
    
    if clothe_color is None:
        return False
    
    ClotheColor.query.filter_by(id_clothe=id_clothe, id_color=id_color).delete()
    db.session.commit()
    return True
  
  def update_clothe_color(self, id_clothe, id_color, stock):
    clothe_color = self.get_clothe_color(id_clothe, id_color)
    
    if clothe_color is None:
        return False
    
    ClotheColor.query.filter_by(id_clothe=id_clothe, id_color=id_color).update({ClotheColor.stock: stock})
    db.session.commit()
    
    clothe_color = self.get_clothe_color(id_clothe, id_color)
    return clothe_color