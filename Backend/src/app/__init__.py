from flask import Flask
from flask_migrate import Migrate
from config import Config
from database import db

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

from app.models.advertisement import Advertisement