from .app import app
from functools import wraps
from . import service
from datetime import datetime
import collections
import flask
from os import path


def serialize(result):
    if isinstance(result, dict):
        return result
    return result.serialize


def json(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        result = f(*args, **kwargs)
        if isinstance(result, collections.Iterable):
            return flask.jsonify([serialize(r) for r in result])
        return flask.jsonify(serialize(result))
    return wrapper


@app.route('/api/accounts')
@json
def accounts():
    return service.find_accounts()


@app.route('/api/account/<account_id>/transactions/<int:page>')
@json
def transactions(account_id, page):
    return service.find_transactions(account_id, page=page)


@app.route('/api/account/<account_id>/tagged/<start_date>/<end_date>')
@json
def aggregate(account_id, start_date, end_date):
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')
    return service.fetch_amounts_per_tag(account_id, start_date, end_date)


@app.route('/api/payee/<int:payee_id>/tag/<tag_name>', methods=['POST'])
def tag_payee(payee_id, tag_name):
    service.tag_payee(payee_id, tag_name)


@app.route('/')
def home_redirect():
    return flask.redirect(flask.url_for('home'))


@app.route('/home')
def home():
    return app.send_static_file('src/views/index.html')


@app.route('/app.js')
def app_js():
    return app.send_static_file('src/generated/app.js')


@app.route('/app.css')
def app_css():
    return app.send_static_file('src/generated/app.css')
