import pytest
from app.repositories.imageRepository import ImageRepository

class TestImageRepository:
  
  @pytest.fixture(scope='module')
  def image_repository(self):
    return ImageRepository()
  
  def test_save_image(self, test_client, image_repository):
    with test_client.application.app_context():
      image = image_repository.save_image(1, 1, 'hashcode', 'url', 'name')
      image = image.to_json()
      assert image['id_clothe'] == 1
      assert image['id_color'] == 1
      assert image['hashcode'] == 'hashcode'
      assert image['url'] == 'url'
      assert image['name'] == 'name'