import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAX_CONTENT_LENGTH = 1024 * 1024
    UPLOAD_EXTENSIONS = ['.jpg', '.png', '.gif', '.jpeg']
    REDIS_URL = os.environ.get('REDIS_URL') or "redis://localhost:6379/0"