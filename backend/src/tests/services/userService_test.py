import pytest
from app.services.userService import UserService

class TestUserService:

  @pytest.fixture(scope='module')
  def user_service(self):
    return UserService()
  
  def test_register(self, test_client, user_service):
    with test_client.application.app_context():
      user = {
        'username': 'username',
        'password': 'password',
        'email': 'email'
      }
      user = user_service.register(user['username'], user['password'], user['email'])

      assert user[1] == 'User registered successfully'

  def test_register_existing(self, test_client, user_service):
    with test_client.application.app_context():
      user = {
        'username': 'username',
        'password': 'password',
        'email': 'email'
      }
      user = user_service.register(user['username'], user['password'], user['email'])

      assert user[0] == None
      assert user[2] == 404

  def test_login(self, test_client, user_service):
    with test_client.application.app_context():
      user = {
        'username': 'username',
        'password': 'password'
      }
      user = user_service.login(user['username'], user['password'])

      assert user[1] == 'Login successful'

  def test_login_not_found(self, test_client, user_service):
    with test_client.application.app_context():
      user = {
        'username': 'username_not_found',
        'password': 'password'
      }
      user = user_service.login(user['username'], user['password'])

      assert user[0] == None
      assert user[2] == 404

  def test_login_wrong_password(self, test_client, user_service):
    with test_client.application.app_context():
      user = {
        'username': 'username',
        'password': 'wrong_password'
      }
      user = user_service.login(user['username'], user['password'])

      assert user[0] == None
      assert user[2] == 401