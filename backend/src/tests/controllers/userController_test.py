import pytest

from app.controllers.userController import user_bp

class TestUserController:

  @pytest.fixture(scope='module')
  def user_controller(self):
    return user_bp.controller
  
  def test_register(self, test_client):
    with test_client.application.app_context():
      user = {
        'username': 'username',
        'password': 'password',
        'email': 'email'
      }
      response = test_client.post('/api/users/register', json=user)

      assert response.status_code == 201
      assert response.json['data']['user']['id'] == 1
      assert response.json['data']['user']['username'] == user['username']
      assert response.json['data']['user']['email'] == user['email']
      assert response.json['data']['user']['id_role'] == 2

  def test_login(self, test_client):
    with test_client.application.app_context():
      user = {
        'username': 'username',
        'password': 'password',
      }
      response = test_client.post('/api/users/login', json=user)
      assert response.status_code == 200
      assert response.json['data']['user']['username'] == user['username']

  def test_get_current_user_npt_authenticated(self, test_client):
    with test_client.application.app_context():
      user = {
        'username': 'username',
        'password': 'password',
      }
      response = test_client.get('/api/users/me', json=user)
      assert response.status_code == 401

  def test_login_invalid_password(self, test_client):
    with test_client.application.app_context():
      user = {
        'username': 'username',
        'password': 'password_invalid',
      }
      response = test_client.post('/api/users/login', json=user)
      assert response.status_code == 401

  def test_login_user_not_found(self, test_client):
    with test_client.application.app_context():
      user = {
        'username': 'username_not_found',
        'password': 'password',
      }
      response = test_client.post('/api/users/login', json=user)
      assert response.status_code == 404