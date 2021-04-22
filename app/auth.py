from flask import jsonify, request
from app import app, db
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.models import User

basic_auth = HTTPBasicAuth() 
token_auth = HTTPTokenAuth()

@basic_auth.error_handler
def auth_error(status):
    return {"error": "Invalid username or password"}, status

@basic_auth.verify_password
def verify_password(email, password):
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return user

@token_auth.verify_token
def verify_token(token):
    return User.check_token(token) if token else None

@app.route('/api/tokens', methods=['POST'])
@basic_auth.login_required
def get_token():
    token = basic_auth.current_user().create_token()
    user_id = basic_auth.current_user().id
    username = basic_auth.current_user().username
    image_url = basic_auth.current_user().get_avatar()

    return jsonify({
        'username': username,
        'token': token,
        'user_id': user_id,
        'image_url': image_url
        })

@app.route('/api/tokens/revoke', methods=['POST'])
def revoke_token():
    data = request.get_json() or {}
    user = User.query.filter_by(token=data['token']).first()
    if not user:
        return {"error": "User has no token"}
    user.revoke_token()
    return {"msg": "token revoked"}, 200
