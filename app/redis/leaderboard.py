from app import redis_client

def increment_posts(user):
    user_id = str(user.id)
    leaderboard = redis_client.zrange('leaderboard', 0, -1)
    if user_id in leaderboard:
        redis_client.zincrby('leaderboard', 1, user_id)
    else:
        redis_client.zadd('leaderboard', {user_id: 1})
    print(leaderboard)

def decrement_posts(user):
    user_id = str(user.id)
    leaderboard = redis_client.zrange('leaderboard', 0, -1)
    if user_id in leaderboard:
        redis_client.zincrby('leaderboard', -1, user_id)
    else:
        redis_client.zadd('leaderboard', {user_id: 1})
    print(leaderboard)