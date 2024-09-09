import pytest
from app import create_app, db
from app.models.user import User
from app.models.role import Role
from app.models.color import Color
from app.models.type import Type
from app.models.gender import Gender

@pytest.fixture(scope='module')
def test_client():
    # Configura la aplicación y el cliente de prueba
    flask_app = create_app('testing')
    testing_client = flask_app.test_client()

    # Crea un contexto de aplicación para la configuración de la base de datos
    with flask_app.app_context():
        # Crea las tablas de la base de datos
        db.create_all()

        # Crea los roles necesarios
        roles = [
            {'name': 'admin', 'description': 'can add new clothes and new admins'},
            {'name': 'user', 'description': 'can buy clothes'}
        ]
        for role in roles:
            db.session.add(Role(**role))
        db.session.commit()

        # Crear un color de prueba
        color = {'name': 'red'}
        db.session.add(Color(**color))
        db.session.commit()

        # Crear una categoría de prueba
        category = {'name': 'hoodie_test'}
        db.session.add(Type(**category))
        db.session.commit()

        # Crear un género de prueba
        gender = {'name': 'male'}
        db.session.add(Gender(**gender))
        db.session.commit()

        # Limpiar usuarios y otros datos si es necesario
        User.query.delete()
        db.session.commit()

        # Devuelve el cliente de prueba
        yield testing_client

        # Limpieza después de las pruebas
        db.session.remove()
        db.drop_all()
