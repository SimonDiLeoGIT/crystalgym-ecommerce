from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from database import db
from flask_jwt_extended import JWTManager

app = Flask(__name__)

app.config.from_object(Config)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

jwt = JWTManager(app)
db.init_app(app)
migrate = Migrate(app, db)

# import models
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
from app.models.clothe_color import ClotheColor
from app.models.clothe_promo import ClothePromo
from app.models.role import Role

# Import controllers
from app.controllers.clotheController import clothe_bp
from app.controllers.userController import user_bp
from app.controllers.authController import auth_bp

app.register_blueprint(clothe_bp, url_prefix="/api")
app.register_blueprint(user_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api")