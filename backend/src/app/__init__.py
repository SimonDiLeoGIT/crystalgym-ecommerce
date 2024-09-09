from flask import Flask
from config import Config, TestingConfig
from extensions import db, migrate, jwt, cors

# Importar modelos
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

def create_app(config_class=Config):
    app = Flask(__name__)

    if config_class == 'testing':
        app.config.from_object(TestingConfig)
    else:
        app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    # Registrar blueprints
    from app.controllers.clotheController import clothe_bp
    from app.controllers.userController import user_bp
    from app.controllers.authController import auth_bp
    from app.controllers.categoriesController import type_bp
    from app.controllers.colorController import color_bp

    app.register_blueprint(clothe_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(type_bp, url_prefix="/api")
    app.register_blueprint(color_bp, url_prefix="/api")

    return app
