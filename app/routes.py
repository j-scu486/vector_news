from flask import jsonify, redirect, url_for, request
from app import app, db
from app.models import User, Post, Tag
from app.auth import token_auth, basic_auth

import re

regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        
@app.route('/api/posts', methods=['GET'])
def get_all_posts():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    data = Post.to_collection_dict(Post.query, page, per_page, 'get_all_posts')

    print(re.match(regex, "http://www.example.com") is not None) # True
    print(re.match(regex, "example.com") is not None)            # False

    return jsonify(data), 200

@app.route('/api/post/<int:id>', methods=['GET'])
def get_post(id):
    query = Post.query.filter(Post.id == id).first().to_dict()
    
    return query, 200

# Get all posts from a user
@app.route('/api/posts/<int:user_id>')
def get_all_user_posts(user_id):
    User.query.get_or_404(int(user_id))

    page = request.args.get('page', 1, type=int)
    query = Post.query.filter_by(user_id=user_id)
    data = Post.to_collection_dict(query, page, 10, 'get_all_user_posts', user_id=user_id)

    return jsonify(data), 200

@app.route('/api/post/create/<int:user_id>', methods=['POST'])
@token_auth.login_required
def create_post(user_id):
    try:
        data = request.get_json()
    except:
        return {"error": "Invalid data"}, 400
    
    new_post = Post()

    # Validate data
    if 'post_title' not in data:
        return {"error": "Post title is required"}, 400
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

    user = User.query.get_or_404(int(user_id))
    new_post.user_id = int(user_id)

    db.session.add(new_post)
    db.session.commit()

    return jsonify(data), 201

@app.route('/api/post/delete/<int:post_id>', methods=['DELETE'])
@token_auth.login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
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
    if 'email' not in data or 'password' not in data:
        return {"error": "email and password fields are required"}, 400
    if User.query.filter_by(email=data['email']).first():
        return {"error": "this email is already registered"}, 400

    new_user = User(email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return {"email": data['email'], "Location": url_for('get_all_posts')}, 201 # Change location later