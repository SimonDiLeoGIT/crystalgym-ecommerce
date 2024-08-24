from app.repositories.roleRepository import RoleRepository

class RoleService:
    def __init__(self):
        self.role_repository = RoleRepository()