from flask import jsonify, redirect, url_for, request
from app import db, redis_client
from app.posts import bp
from app.redis.leaderboard import increment_posts, decrement_posts
from app.models import User, Post, Tag, Like
from app.auth.auth import token_auth, basic_auth
from app.utils.utils import check_image, EMAIL_REGEX, regex

import re, os
        
@bp.route('/')
def index():
    return "blank"

# Get all posts
@bp.route('/api/posts', methods=['GET'])
def get_all_posts():
    page = request.args.get('page', 1, type=int)
    per_page = 9
    data = Post.to_collection_dict(Post.query.order_by(Post.created.desc()), page, per_page, 'posts_bp.get_all_posts')

    return jsonify(data), 200

# Get post by tag
@bp.route('/api/posts/<string:tag>', methods=['GET'])
def get_tag_by_post(tag):
    page = request.args.get('page', 1, type=int)
    per_page = 9
    data = Post.to_collection_dict(Post.get_by_tag_name(tag).order_by(Post.created.desc()), page, per_page, 'posts_bp.get_tag_by_post', tag=tag)

    return jsonify(data), 200

# Get just an individual post
@bp.route('/api/post/<int:id>', methods=['GET'])
def get_post(id):
    query = Post.query.filter(Post.id == id).first().to_dict()
    
    return query, 200

# Get all posts from a user
@bp.route('/api/posts/<int:user_id>', methods=['GET'])
def get_all_user_posts(user_id):
    User.query.get_or_404(int(user_id))

    page = request.args.get('page', 1, type=int)
    query = Post.query.filter_by(user_id=user_id)
    data = Post.to_collection_dict(query, page, 1, 'posts_bp.get_all_user_posts', user_id=user_id)

    return jsonify(data), 200

@bp.route('/api/post/create', methods=['POST'])
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
    increment_posts(user)

    db.session.add(new_post)
    db.session.commit()

    return jsonify(data), 201

@bp.route('/api/post/delete', methods=['DELETE'])
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

    decrement_posts(user)
    db.session.delete(post)
    db.session.commit()
    
    return {"msg": "post deleted"}, 202

@bp.route('/api/post/like', methods=['POST'])
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
