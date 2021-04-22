from flask import jsonify, redirect, url_for, request
from app import app, db
from app.models import User, Post, Tag, Like
from app.auth import token_auth, basic_auth
from app.utils import check_image, EMAIL_REGEX, regex

import re, os
        
# Get all posts
@app.route('/api/posts', methods=['GET'])
def get_all_posts():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    data = Post.to_collection_dict(Post.query.order_by(Post.created.desc()), page, per_page, 'get_all_posts')

    return jsonify(data), 200

# Get post by tag
@app.route('/api/posts/<string:tag>', methods=['GET'])
def get_tag_by_post(tag):
    page = request.args.get('page', 1, type=int)
    per_page = 10
    data = Post.to_collection_dict(Post.get_by_tag_name(tag).order_by(Post.created.desc()), page, per_page, 'get_tag_by_post', tag=tag)

    return jsonify(data), 200

# Get just an individual post
@app.route('/api/post/<int:id>', methods=['GET'])
def get_post(id):
    query = Post.query.filter(Post.id == id).first().to_dict()
    
    return query, 200

# Return user info
@app.route('/api/user/info/<int:user_id>', methods=['GET'])
def get_user_info(user_id):
    return User.query.get_or_404(int(user_id)).to_dict()

# Get all posts from a user
@app.route('/api/posts/<int:user_id>', methods=['GET'])
def get_all_user_posts(user_id):
    User.query.get_or_404(int(user_id))

    page = request.args.get('page', 1, type=int)
    query = Post.query.filter_by(user_id=user_id)
    data = Post.to_collection_dict(query, page, 10, 'get_all_user_posts', user_id=user_id)

    return jsonify(data), 200

@app.route('/api/post/create', methods=['POST'])
@token_auth.login_required
def create_post():
    try:
        data = request.get_json()
    except:
        return {"error": "Bad Request"}, 400
    
    new_post = Post()

    # Validate data
    if 'tags' not in data:
        return {"error": "Tags are required"}, 400
    if 'post_url' not in data:
        return {"error": "URL is required"}, 400
    
    for tag in data['tags']:
        if tag not in Tag.valid_tags():
            return {"error": "Invalid Tag"}, 400
    
    if not re.match(regex, data['post_url']):
        return {"error": "URL is not valid"}, 400

    new_post.from_dict(data)

    user = User.query.filter_by(token=token_auth.current_user().token).first()
    new_post.user_id = user.id

    db.session.add(new_post)
    db.session.commit()

    return jsonify(data), 201

@app.route('/api/post/delete', methods=['DELETE'])
@token_auth.login_required
def delete_post():
    data = request.get_json() or {}
    try:
        post = Post.query.get(int(data['post_id']))
    except:
        return {"error": "invalid data"}, 400
    user = User.query.filter_by(token=token_auth.current_user().token).first()
    if not post:
        return {"error": "could not find post"}, 400
    if post.user_id != user.id:
        return {"error": "Invalid credentials"}, 401
    db.session.delete(post)
    db.session.commit()
    
    return {"msg": "post deleted"}, 202

# Register user
@app.route('/api/user/register', methods=['POST'])
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

    return {"email": data['email'], "Location": url_for('get_all_posts')}, 201 # Change location later

@app.route('/api/user/register/image', methods=['POST'])
def handle_user_image():
    data = request.files['file']

    uploaded_file = data
    image_file = check_image(uploaded_file.filename)

    uploaded_file.save(os.path.join('app/static/avatars', image_file))

    return {"message": "image uploaded"}, 201

@app.route('/api/post/like', methods=['POST'])
@token_auth.login_required
def like_post():
    data = request.get_json() or {}
    try:
        post = int(data['post_id'])
    except:
        return {"error": "invalid data"}, 400

    user = User.query.filter_by(token=token_auth.current_user().token).first()
    liked_post = user.add_remove_like(post)

    db.session.commit()

    return jsonify(liked_post)
