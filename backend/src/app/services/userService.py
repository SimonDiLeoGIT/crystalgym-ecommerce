from app.repositories.userRepository import UserRepository
from app.repositories.roleRepository import RoleRepository
from app.utils.singletonMeta import SingletonMeta

class UserService(metaclass=SingletonMeta):
    def __init__(self):
        self.user_repository = UserRepository()
        self.role_repository = RoleRepository()

    def register(self, username, password, email):
        try:
            
            if self.username_exists(username):
                return [None, 'Username already exists']
            if self.email_exists(email):
                return [None, 'Email already exists']
            
            user_role = self.role_repository.get_user_called_role()
            if user_role is None:
                raise ValueError('User role not found')
            
            user = self.user_repository.save_user(username, password, email, user_role.id)
            
            return [user, 'User registered successfully']
        except Exception as e:
            raise e
        
    def login(self, username, password):
        user = self.user_repository.get_user_by_username(username)

        if user is None:
            return [None, 'User does not exist', 404]

        if user.password != password:
            return [None, 'Username and password do not match', 401]

        return [user.to_json(), 'Login successful']
    
    def username_exists(self, username):
        return self.user_repository.exists_username(username)
    
    def email_exists(self, email):
        return self.user_repository.exists_email(email)