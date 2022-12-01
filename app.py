

# compose_flask/app.py
from flask import Flask, render_template
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)

@app.route('/')
def index():
    redis.incr('hits')
    #return 'This Compose/Flask demo has been viewed %s time(s).' % redis.get('hits')
    return render_template('UBNavWebPage.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

