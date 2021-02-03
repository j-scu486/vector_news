from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from flask import url_for
from app import db

import base64
import os

tags = db.Table('tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True),
)

class PaginatedAPIMixin(object):
    @staticmethod
    def to_collection_dict(query, page, per_page, endpoint, **kwargs):
        resources = query.paginate(page, per_page, False)
        data = {
            'items': [item.to_dict() for item in resources.items],
            '_meta': {
                'page': page,
                'per_page': per_page,
                'total_pages': resources.pages,
                'total_items': resources.total
            },
            '_links': {
                'self': url_for(endpoint, page=page, per_page=per_page, **kwargs),
                'next': url_for(endpoint, page=page + 1, per_page=per_page, **kwargs) if resources.has_next else None,
                'prev': url_for(endpoint, page=page - 1, per_page=per_page, **kwargs) if resources.has_prev else None
            }
        }
        return data

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime)

    def get_post_count(self):
        return {"post_count" : Post.query.filter_by(user_id=self.id).count()}

    def create_token(self, expires_in=6000):
        now = datetime.utcnow()
        if self.token and self.token_expiration  > now + timedelta(seconds=60):
            return self.token
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.add(self)
        db.session.commit()

    def revoke_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)

    @staticmethod
    def check_token(token):
        user = User.query.filter_by(token=token).first()
        if User is None or user.token_expiration < datetime.utcnow():
            return None
        return user
        
    def set_password(self,password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return  check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Post(PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_title = db.Column(db.String(140))
    post_description = db.Column(db.String(140))
    post_comment = db.Column(db.String(140))
    post_url = db.Column(db.String(290))
    tags = db.relationship("Tag", secondary=tags)
    created = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def to_dict(self):
        data = {
            'id': self.id,
            'post_url': self.post_url,
            'post_title': self.post_title,
            'post_description': self.post_description,
            'post_comment': self.post_comment,
            'tags': [tag.tag_name for tag in self.tags],
            'date_created': self.created
        }

        return data

    def from_dict(self, data):
        for field in data:
            if field == 'tags':
                for i in range(len(data[field])):
                    t = Tag.query.filter_by(tag_name=data[field][i]).first()
                    self.tags.append(t)
            else:
                setattr(self, field, data[field])

    def __repr__(self):
        return '<Post {}>'.format(self.post_title)

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(140))

    @classmethod
    def valid_tags(cls):
        return [tag.tag_name for tag in cls.query.all()]

    def __repr__(self):
        return '<Tag {}>'.format(self.tag_name)
