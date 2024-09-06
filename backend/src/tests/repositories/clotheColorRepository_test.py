import pytest
from app.repositories.clotheColorRepository import ClotheColorRepository

class TestClotheColorRepository:
  @pytest.fixture(scope='module')
  
  def clothe_color_repository(self):
    return ClotheColorRepository()
  
  # Test that save clothe color works
  def test_save_clothe_color(self, test_client, clothe_color_repository):
    with test_client.application.app_context():
      id_clothe = 1
      id_color = 1
      stock = 10
      data = clothe_color_repository.save_clothe_color(id_clothe, id_color, stock)
      new_clothe_color = data.to_json()
      assert new_clothe_color['id_clothe'] == id_clothe
      assert new_clothe_color['id_color'] == id_color
      assert new_clothe_color['stock'] == stock

  # Test that get existing clothe color works
  def test_get_clothe_colors(self, test_client, clothe_color_repository):
    with test_client.application.app_context():
      id_clothe = 2
      for i in range(3):
        clothe_color_repository.save_clothe_color(id_clothe, i+1, 10)
      data = clothe_color_repository.get_clothe_colors(id_clothe)
      new_clothe_colors = [clothe_color.to_json() for clothe_color in data]
      assert len(new_clothe_colors) == 3
      assert new_clothe_colors[0]['id_clothe'] == id_clothe

  # Test that get non-existing clothe color works
  def test_get_non_existing_clothe_color(self, test_client, clothe_color_repository):
    with test_client.application.app_context():
      id_clothe = 3
      id_color = 1
      data = clothe_color_repository.get_clothe_color(id_clothe, id_color)
      assert data is None

  # Test that get existing clothe color works
  def test_get_clothe_color(self, test_client, clothe_color_repository):
    with test_client.application.app_context():
      id_clothe = 1
      id_color = 1
      data = clothe_color_repository.get_clothe_color(id_clothe, id_color)
      new_clothe_color = data.to_json()
      assert new_clothe_color['id_clothe'] == id_clothe
      assert new_clothe_color['id_color'] == id_color

  # Test that remove clothe color works
  def test_remove_clothe_color(self, test_client, clothe_color_repository):
    with test_client.application.app_context():
      id_clothe = 1
      id_color = 1
      data = clothe_color_repository.remove_clothe_color(id_clothe, id_color)
      deleted_clothe = clothe_color_repository.get_clothe_color(id_clothe, id_color)
      assert data
      assert deleted_clothe is None

  # Test that remove non-existing clothe color works
  def test_remove_non_existing_clothe_color(self, test_client, clothe_color_repository):
    with test_client.application.app_context():
      id_clothe = 3
      id_color = 1
      data = clothe_color_repository.remove_clothe_color(id_clothe, id_color)
      assert not data

  # Test that update clothe color works
  def test_update_clothe_color(self, test_client, clothe_color_repository):
    with test_client.application.app_context():
      id_clothe = 2
      id_color = 1
      stock = 15
      data = clothe_color_repository.update_clothe_color(id_clothe, id_color, stock)
      clothe_color = data.to_json()
      assert clothe_color['id_clothe'] == id_clothe
      assert clothe_color['id_color'] == id_color
      assert clothe_color['stock'] == stock