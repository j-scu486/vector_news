from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_redis import FlaskRedis
from config import Config

# Config settings
cors = CORS()
db = SQLAlchemy()
migrate = Migrate()
redis_client = FlaskRedis(decode_responses=True)

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    redis_client.init_app(app)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    from app.redis import bp as redis_bp
    app.register_blueprint(redis_bp)

    from app.posts import bp as posts_bp
    app.register_blueprint(posts_bp)

    return app

from app import models