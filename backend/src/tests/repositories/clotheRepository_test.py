import pytest
from datetime import datetime
from app.repositories.clotheRepository import ClotheRepository

class TestClotheRepository:
  
  @pytest.fixture(scope='module')
  def clothe_repository(self):
    return ClotheRepository()
  
  def test_save_clothe(self, test_client, clothe_repository):
    with test_client.application.app_context():
      clothe = clothe_repository.save_clothe('name', 1, datetime.now(), 1, 1)
      clothe = clothe.to_json()
      assert clothe['name'] == 'name'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1