# Get all posts
from app.redis import bp
from app.models import User
from app import redis_client

@bp.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard_list = []

    leaderboard_rankings = redis_client.zrevrangebyscore('leaderboard', 10, 0, withscores=True)
    for value in leaderboard_rankings:
        user_info = User.query.get_or_404(value[0]).to_dict()
        user_info['posts_count'] = value[1]
        leaderboard_list.append(user_info)
        
    return {"leaderboard_data": leaderboard_list}, 200