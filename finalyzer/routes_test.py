from . import service
from .db import db, Transaction
from .main import app
from datetime import datetime
from json import loads
from unittest.mock import MagicMock
import pytest


app = app.test_client()


acc_name = 'test-account'
payee_name = 'test-payee'


@pytest.yield_fixture(autouse=True)
def rollback():
    db.session.commit = MagicMock()
    # wait for test method to be run
    yield
    assert not db.session.commit.called
    db.session.rollback()


def test_accounts():
    service.find_or_create_account(acc_name)
    service.find_or_create_account(acc_name + '2')
    response = app.get('/accounts')
    data = loads(response.data.decode('utf-8'))
    assert len(data) >= 2
    account_names = set(acc['name'] for acc in data)
    assert acc_name in account_names
    assert acc_name + '2' in account_names


def transactions(account_id, page):
    acc = service.find_or_create_account(acc_name)
    payee = service.find_or_create_payee(payee_name)
    transaction = Transaction(
        id='test-transaction',
        amount=50,
        account=acc,
        payee=payee,
        date=datetime.now(),
        type='debit')
    service.create_transaction(transaction)
    response = app.get('/account/{}/transactions/1'.format(acc.id))
    data = loads(response.data.decode('utf-8'))
    assert len(data) == 1
