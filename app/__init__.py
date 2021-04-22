from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config

# from app.posts import posts_bp

app = Flask(__name__)

# Blueprints
# app.register_blueprint(posts_bp)
# Config settings

CORS(app)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import auth, routes, models

