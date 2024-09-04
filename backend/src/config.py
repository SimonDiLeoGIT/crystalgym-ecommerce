import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()  # Load variables from .env file

class Config(object):
    # Database
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable tracking modifications for performance
    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES")))
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES")))
    # AWS
    AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")
    AWS_BUCKET_REGION = os.getenv("AWS_BUCKET_REGION")
    AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    ALLOWED_EXTENSIONS = os.getenv("ALLOWED_EXTENSIONS")

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
