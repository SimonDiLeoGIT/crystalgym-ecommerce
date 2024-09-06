import pytest
import io

from app.controllers.clotheController import clothe_bp

class TestClotheController:
  
  @pytest.fixture(scope='module')
  def clothe_controller(self):
    return clothe_bp.controller
  
  def test_post_clothe(self, test_client):
      with test_client.application.app_context():
          fake_image = (io.BytesIO(b"fake image data"), 'test_image.jpg')
          
          data = {
              'name': 'test',
              'description': 'test',
              'id_category': '1',
              'id_gender': '1',
              'price': '10',
              'colors[0][id_color]': '1',
              'colors[0][stock]': '10',
              'colors[0][images][0][image]': fake_image
          }
          response = test_client.post('/api/clothe', data=data, content_type='multipart/form-data')

          assert response.status_code == 201