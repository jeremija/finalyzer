export FLASK_APP := ./finalyzer/main.py

.PHONY: all
all: env requirements migrate test

.PHONY: test
test:

	./env/bin/python -m pytest finalyzer
	cd public && npm test

.PHONY: server
server:

	./env/bin/python -m flask run

.PHONY: migrate
migrate:

	./env/bin/python -m flask db upgrade

.PHONY: requirements
requirements:

	./env/bin/python -m pip install -r requirements.txt
	cd public && npm install && npm run less && npm run compile

.PHONY: env
env:

	python3 -m venv env/
