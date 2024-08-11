from flask import Flask
from flask_migrate import Migrate
from config import Config
from database import db

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

from app.models.color import Color
from app.models.gender import Gender
from app.models.promo import Promo
from app.models.type import Type
from app.models.advertisement import Advertisement
from app.models.clothe import Clothe
from app.models.user import User
from app.models.order import Order
from app.models.image import Image
from app.models.clothe_advertisement import ClotheAdvertisement
from app.models.clothe_order import ClotheOrder