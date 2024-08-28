from app.repositories.userRepository import UserRepository
from app.repositories.roleRepository import RoleRepository
from app.utils.singletonMeta import SingletonMeta

class UserService(metaclass=SingletonMeta):
    def __init__(self):
        self.user_repository = UserRepository()
        self.role_repository = RoleRepository()

    def register(self, username, password, email):
        if self.username_exists(username):
            return [None, 'Username already exists']
        if self.email_exists(email):
            return [None, 'Email already exists']
        user_role = self.role_repository.get_user_called_role()
        user = self.user_repository.save_user(username, password, email, user_role.id)
        return [user, 'User registered successfully']
    
    def login(self, username, password):
        user = self.user_repository.get_user_by_username(username)

        if user is None:
            return None

        if user.password != password:
            return None

        return user.to_json()
    
    def username_exists(self, username):
        return self.user_repository.exists_username(username)
    
    def email_exists(self, email):
        return self.user_repository.exists_email(email)