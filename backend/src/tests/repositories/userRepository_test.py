import pytest
from app import create_app, db
from app.models.user import User
from app.repositories.userRepository import UserRepository
from app.services.userService import UserService
from app.utils.responseHandler import ResponseHandler

class TestUserRepository:
  
  @pytest.fixture(scope='module')
  def user_repository(self):
      return UserRepository()

  def test_save_user(self, test_client, user_repository):
    with test_client.application.app_context():
      user_repository.save_user('username', 'password', 'email', 1)
      assert user_repository.exists_username('username')

  def test_can_not_save_same_username(self, test_client, user_repository):
    with test_client.application.app_context():
      with pytest.raises(ValueError, match="Username already exists"):
          user_repository.save_user('username', 'new_password', 'new_email', 1)
  
  def test_can_not_save_same_email(self, test_client, user_repository):
    with test_client.application.app_context():
      with pytest.raises(ValueError, match="Email already exists"):
          user_repository.save_user('new_username', 'new_password', 'email', 1)
  
  def test_get_user_by_username(self, test_client, user_repository):
    with test_client.application.app_context():
      assert user_repository.get_user_by_username('username')
  
  def test_user_not_found(self, test_client, user_repository):
    with test_client.application.app_context():
      non_existent_user = user_repository.get_user_by_username('non_existent_username')
      assert non_existent_user is None
  