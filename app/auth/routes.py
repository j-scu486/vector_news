from flask import jsonify, redirect, url_for, request
from app import db
from app.auth import bp
from app.models import User, Post, Like, Tag
from app.auth.auth import token_auth, basic_auth
from app.utils.utils import check_image, EMAIL_REGEX, regex

import re, os

# Return user info
@bp.route('/api/user/info/<int:user_id>', methods=['GET'])
def get_user_info(user_id):
    return User.query.get_or_404(int(user_id)).to_dict()

# Register user
@bp.route('/api/user/register', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    if 'email' not in data or 'password' not in data or 'username' not in data:
        return {"error": "email, username, and password fields are required"}, 400
    if data['email'] == '' or data['password'] == "" or data["username"] == "":
        return {"error": "All fields are required"}, 400
    if not re.match(EMAIL_REGEX, data['email']):
        return {"error": "Invalid email"}, 400
    if User.query.filter_by(email=data['email']).first():
        return {"error": "this email is already registered"}, 400

    image_file = check_image(data['image_file'])
    new_user = User(email=data['email'], username=data['username'], image_filepath=image_file)
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return {"email": data['email'], "Location": url_for('posts_bp.get_all_posts')}, 201 # Change location later

@bp.route('/api/user/register/image', methods=['POST'])
def handle_user_image():
    data = request.files['file']

    uploaded_file = data
    image_file = check_image(uploaded_file.filename)

    uploaded_file.save(os.path.join('app/static/avatars', image_file))

    return {"message": "image uploaded"}, 201