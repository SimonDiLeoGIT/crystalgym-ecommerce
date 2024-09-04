import pytest
from datetime import datetime
from app.services.clotheService import ClotheService

class TestClotheService:

  @pytest.fixture(scope='module')
  def clothe_service(self):
    return ClotheService()
  
  def test_save_clothe(self, test_client, clothe_service):
    with test_client.application.app_context():
      clothe = clothe_service.save_clothe('name', 1, datetime.now(), 1, 1)
      assert clothe['name'] == 'name'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1