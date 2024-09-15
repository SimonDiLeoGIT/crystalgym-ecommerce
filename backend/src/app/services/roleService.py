from app.repositories.roleRepository import RoleRepository
from app.utils.singletonMeta import SingletonMeta

class RoleService(metaclass=SingletonMeta):
    def __init__(self):
        self.role_repository = RoleRepository()