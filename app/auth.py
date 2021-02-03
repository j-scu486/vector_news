from flask import jsonify
from app import app, db
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.models import User

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

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
    db.session.commit()
    return jsonify({
        'token': token,
        'user_id': user_id
        })