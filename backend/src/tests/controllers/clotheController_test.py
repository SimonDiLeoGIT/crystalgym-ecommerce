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
              'colors[0][images]': fake_image
          }
          response = test_client.post('/api/clothe', data=data, content_type='multipart/form-data')
          assert response.status_code == 201
          assert response.json['data']['id'] == 1
          assert response.json['data']['name'] == data['name']

  def test_get_clothe_by_id(self, test_client):
    with test_client.application.app_context():
      data = test_client.get('/api/clothe/1')
      assert data.status_code == 200
      assert data.json['data']['id'] == 1

  def test_get_clothe_not_found(self, test_client):
    with test_client.application.app_context():
      data = test_client.get('/api/clothe/100')
      assert data.status_code == 404
  
  def test_get_clothes_by_category(self, test_client):
      with test_client.application.app_context():
          response = test_client.get('/api/clothes/1/1/1/10')
          assert response.status_code == 200
          data = response.json
          clothes = data['data']['clothes']
          assert len(clothes) > 0
          assert clothes[0]['id'] == 1
  
  def test_get_clothes_by_category_gender_not_found(self, test_client):
      with test_client.application.app_context():
          response = test_client.get('/api/clothes/100/1/1/10')
          assert response.status_code == 404
  
  def test_get_clothes_by_category_category_not_found(self, test_client):
      with test_client.application.app_context():
          response = test_client.get('/api/clothes/1/100/1/10')
          assert response.status_code == 404

  