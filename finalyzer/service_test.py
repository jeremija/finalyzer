from . import service
from .db import db, Account, Payee, Transaction
from datetime import datetime, timedelta
from unittest.mock import MagicMock
import pytest


@pytest.yield_fixture(autouse=True)
def rollback():
    db.session.commit = MagicMock()
    # wait for test method to be run
    yield
    db.session.rollback()


account_number = 'test-account'
payee_name = 'test-payee'
transaction_id = 'test-transaction'
tag_name = 'test-tag'


def test_find_or_create_account():
    acc = Account.query.get(account_number)
    assert acc is None
    service.find_or_create_account(account_number)
    acc = Account.query.get(account_number)
    assert acc is not None
    db.session.flush()
    assert acc.id is not None


def test_find_or_create_account2():
    acc = Account(account_number, account_number)
    db.session.add(acc)
    acc2 = service.find_or_create_account(account_number)
    assert acc2 is not None
    assert acc2.id == acc.id


def test_find_or_create_payee():
    payees = Payee.query.filter(Payee.name == payee_name).limit(1).all()
    assert not payees
    payee = service.find_or_create_payee(payee_name)
    assert payee is not None
    db.session.flush()
    assert payee.id is not None


def test_find_or_create_payee2():
    payee = Payee(payee_name)
    db.session.add(payee)
    payee2 = service.find_or_create_payee(payee_name)
    assert payee2.id == payee.id


def test_find_transaction():
    t = service.find_transaction('-1')
    assert t is None


def _create_transaction(id=transaction_id, amount=500, type='credit'):
    acc = service.find_or_create_account(account_number)
    payee = service.find_or_create_payee(payee_name)
    transaction = Transaction(
        id,
        account=acc,
        payee=payee,
        amount=amount,
        date=datetime.now(),
        type=type)
    service.create_transaction(transaction)
    db.session.flush()
    return transaction


def test_find_transaction2():
    transaction = _create_transaction()
    t = service.find_transaction(transaction.id)
    assert t is not None
    assert t.id == transaction.id


def test_tag_payeee():
    payee = Payee(payee_name)
    db.session.add(payee)
    db.session.flush()
    service.tag_payee(tag_name, payee.id)
    tag = service.find_tag(tag_name)
    assert tag is not None
    assert tag.id is not None
    payee = service.find_payee(payee_name)
    assert payee is not None
    assert payee.tag_id == tag.id


def test_untag_payee():
    payee = Payee(payee_name)
    db.session.add(payee)
    db.session.flush()
    service.tag_payee(tag_name, payee.id)
    service.untag_payee(payee.id)
    payee = service.find_payee(payee_name)
    assert payee is not None
    assert payee.tag_id is None


def test_fetch_amounts_per_tag():
    t1 = _create_transaction(500)
    _create_transaction(id='test-transaction-2', amount=600)
    _create_transaction(id='test-transaction-3', amount=700)
    service.tag_payee(tag_name, t1.payee.id)
    db.session.flush()

    start_date = datetime.now() - timedelta(days=1)
    end_date = datetime.now() + timedelta(days=1)
    a = service.fetch_amounts_per_tag(account_number, start_date, end_date)
    assert len(a) == 1
    assert a[0] == {'amount': 1800, 'name': 'test-tag', 'type': 'credit'}
