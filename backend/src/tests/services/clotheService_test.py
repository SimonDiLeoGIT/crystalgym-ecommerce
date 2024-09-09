import pytest
from datetime import datetime
from app.services.clotheService import ClotheService

class TestClotheService:

  @pytest.fixture(scope='module')
  def clothe_service(self):
    return ClotheService()
  
  def test_save_clothe(self, test_client, clothe_service):
    with test_client.application.app_context():
      data = clothe_service.save_clothe('name', 'description', 1, 1, 1)
      clothe = data[0]
      assert data[1] == 'success'
      assert data[2] == 201
      assert clothe['name'] == 'name'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1

  def test_save_clothe_color(self, test_client, clothe_service):
    with test_client.application.app_context():
      data = clothe_service.save_clothe_color(1, 1, 1)
      assert data[1] == 'success'
      assert data[2] == 201

  def test_get_clothe_by_id(self, test_client, clothe_service):
    with test_client.application.app_context():
      data = clothe_service.get_clothe_by_id(1)
      clothe = data[0]
      assert data[1] == 'success'
      assert data[2] == 200
      assert clothe['name'] == 'name'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1

  def test_get_clothe_by_id_not_found(self, test_client, clothe_service):
    with test_client.application.app_context():
      data = clothe_service.get_clothe_by_id(100)
      assert data[1] == 'Clothe not found'
      assert data[2] == 404

  def test_get_clothes_by_category(self, test_client, clothe_service):
    with test_client.application.app_context():
      data = clothe_service.get_clothes_by_category(1, 1)
      assert data[1] == 'success'
      assert data[2] == 200

  def test_update_clothe(self, test_client, clothe_service):
    with test_client.application.app_context():
      data = clothe_service.update_clothe(1, 'new_name', 'new_description', 10.0)
      clothe = data[0]
      assert data[1] == 'success'
      assert data[2] == 200
      assert clothe['name'] == 'new_name'
      assert clothe['description'] == 'new_description'
      assert clothe['price'] == 10.0

  def test_update_clothe_not_found(self, test_client, clothe_service):
    with test_client.application.app_context():
      data = clothe_service.update_clothe(100, 'new_name', 'new_description', 10.0)
      assert data[1] == 'Clothe not found'
      assert data[2] == 404

  def test_delete_clothe(self, test_client, clothe_service):
    with test_client.application.app_context():
      data = clothe_service.delete_clothe(1)
      assert data[0] == True
      assert data[1] == 'success'

  def test_delete_clothe_not_found(self, test_client, clothe_service):
    with test_client.application.app_context():
      data = clothe_service.delete_clothe(1)
      assert data[1] == 'Clothe not found'