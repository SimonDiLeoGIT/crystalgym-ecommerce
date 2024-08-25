import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env file

class Config(object):
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable tracking modifications for performance
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
