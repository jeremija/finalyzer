FLASK_APP := ./finalyzer/main.py

.PHONY: all
all: env requirements migrate test

.PHONY: test
test:

	./env/bin/pytest finalyzer
	cd public && npm test

.PHONY: server
server:

	FLASK_APP=${FLASK_APP} ./env/bin/python3 -m flask run

.PHONY: migrate
migrate:

	FLASK_APP=${FLASK_APP} ./env/bin/python3 -m flask db upgrade

.PHONY: requirements
requirements:

	./env/bin/pip3 install -r requirements.txt
	cd public && npm install && npm run less && npm run compile

.PHONY: env
env:

	python3 -m venv env/