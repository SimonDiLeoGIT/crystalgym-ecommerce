import pytest
from app.services.imageService import ImageService

class TestImageService:

  @pytest.fixture(scope='module')
  def image_service(self):
    return ImageService()
  
  def test_save_image(self, test_client, image_service):
    with test_client.application.app_context():
      image = image_service.save_image(1, 1, 'hashcode', 'url', 'name')
      assert image['id_clothe'] == 1
      assert image['id_color'] == 1
      assert image['hashcode'] == 'hashcode'
      assert image['url'] == 'url'
      assert image['name'] == 'name'