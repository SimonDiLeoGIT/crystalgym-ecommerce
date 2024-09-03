import pytest
from app.models.user import User

class TestUser:

  def test_init(self):
    user = User("username", "password", "email", 1)
    assert user.username == "username"
    assert user.password == "password"
    assert user.email == "email"
    assert user.id_role == 1

  def test_to_json(self):
    id_role = 2
    user = User("username", "password", "email", id_role)
    assert user.to_json() == {
      'id': None,
      'username': 'username',
      'email': 'email',
      'id_role': id_role
    }