import pytest
from app import create_app, db

@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app('testing')
    testing_client = flask_app.test_client()

    with flask_app.app_context():
        db.create_all()

        yield testing_client

        db.session.remove()
        db.drop_all()
