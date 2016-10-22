from flask import Flask
from os import path
import logging
import os

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
app.config['SQLALCHEMY_ECHO'] = 'LOG_SQL' in os.environ
