from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from os import path
import logging

FORMAT = '%(asctime)-15s [%(name)-7.7s %(levelname)-5.5s] %(message)s'
log = logging.getLogger('finalyzer')
log.setLevel(logging.DEBUG)
console = logging.StreamHandler()
formatter = logging.Formatter(FORMAT)
console.setFormatter(formatter)
log.addHandler(console)

app = Flask('finalyzer')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{}'.format(
    path.join(path.dirname(__file__), '../finalyzer.db'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Account(db.Model):
    id = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return '<Account {} {}>'.format(self.id, self.name)

# payee_tag = db.Table(
#     'payee_tag',
#     db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
#     db.Column('payee_id',
#               db.String(255),
#               db.ForeignKey('payee.id')))


class Payee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))
    tag = db.relationship(
      'Tag',
      backref=db.backref('payees', lazy='dynamic'))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Payee {} {}>'.format(self.id, self.name)


class Transaction(db.Model):
    id = db.Column(db.String(255), primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    type = db.Column(db.String(20))
    account_id = db.Column(
        db.String(255),
        db.ForeignKey('account.id'),
        nullable=False)
    account = db.relationship(
        'Account',
        backref=db.backref('transactions', lazy='dynamic'))
    payee_id = db.Column(db.Integer, db.ForeignKey('payee.id'), nullable=False)
    payee = db.relationship(
        'Payee',
        backref=db.backref('transactions', lazy='dynamic'))

    def __init__(self, id, account, payee, amount, date, type):
        self.id = id
        self.account = account
        self.payee = payee
        self.amount = amount
        self.date = date
        self.type = type

    def __repr__(self):
        return '<Transaction {} {} {}>'.format(self.id, self.date, self.amount)


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Tag {} {}>'.format(self.id, self.name)