from flask import Blueprint

bp = Blueprint('redis_bp', __name__)

from app.redis import routes



