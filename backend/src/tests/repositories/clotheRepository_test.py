import pytest
from datetime import datetime
from app.repositories.clotheRepository import ClotheRepository

class TestClotheRepository:
  
  @pytest.fixture(scope='module')
  def clothe_repository(self):
    return ClotheRepository()
  
  # Test that save clothe works
  def test_save_clothe(self, test_client, clothe_repository):
    with test_client.application.app_context():
      clothe = clothe_repository.save_clothe('name', 'description', 1, datetime.now(), 1, 1)
      clothe = clothe.to_json()
      assert clothe['name'] == 'name'
      assert clothe['description'] == 'description'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1

  # Test that get clothe by id works
  def test_get_clothe_by_id(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.get_clothe_by_id(1)
      clothe = data.to_json()
      assert clothe['name'] == 'name'
      assert clothe['description'] == 'description'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1

  # Test that get clothes by non-existing id returns None
  def test_get_clothe_by_id_not_found(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.get_clothe_by_id(100)
      assert data is None

  # Test that get clothes by category works
  def test_get_clothes_by_category(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.get_clothes_by_category(1, 1)
      assert data

  # Test that update clothe works
  def test_update_clothe(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.update_clothe(1, 'new_name', 'new_description', 1, datetime.now(), 1, 1)
      clothe = data.to_json()
      assert clothe['name'] == 'new_name'
      assert clothe['description'] == 'new_description'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1

  # Test that update non-existing clothe returns None
  def test_update_clothe_not_found(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.update_clothe(100, 'new_name', 'new_description', 1, datetime.now(), 1, 1)
      assert data is None

  # Test that delete clothe works
  def test_delete_clothe(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.delete_clothe(1)
      assert data

  # Test that delete non-existing clothe returns None
  def test_delete_clothe_not_found(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.delete_clothe(100)
      assert data is None