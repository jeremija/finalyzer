from .app import log
from .db import db, Account, Payee, Transaction, Tag


def find_accounts():
    return Account.query.all()


def find_or_create_account(account_number):
    acc = Account.query.get(account_number)
    if acc:
        log.debug('found acc: %s', acc)
        return acc
    acc = Account(account_number, account_number)
    log.debug('creating acc: %s', acc)
    db.session.add(acc)
    return acc


def find_payee_by_name(payee_name):
    payee = Payee.query \
        .filter(Payee.name == payee_name) \
        .outerjoin(Payee.tag) \
        .first()
    return payee


def find_payee(payee_id):
    return Payee.query \
        .filter(Payee.id == payee_id) \
        .outerjoin(Payee.tag) \
        .first()


def find_or_create_payee(payee_name):
    payee = find_payee_by_name(payee_name)
    if payee:
        log.debug('found payee: %s', payee)
        return payee
    payee = Payee(payee_name)
    log.debug('creating payee: %s', payee)
    db.session.add(payee)
    return payee


def find_transaction(transaction_id):
    transaction = Transaction.query \
        .filter(Transaction.id == transaction_id) \
        .join(Transaction.payee) \
        .outerjoin(Payee.tag) \
        .first()
    if transaction:
        log.debug('found transaction: %s', transaction)
    return transaction


def find_transactions(account_id, page=1, per_page=50):
    return Transaction.query \
        .filter(Transaction.account_id == account_id) \
        .join(Transaction.payee) \
        .outerjoin(Payee.tag) \
        .order_by(Transaction.date.desc()) \
        .paginate(page=page, per_page=per_page) \
        .items


def create_transaction(transaction):
    log.debug('creating transaction: %s', transaction)
    db.session.add(transaction)


def find_tag(tag_name):
    return Tag.query.filter(Tag.name == tag_name).first()


def search_tags(tag_name):
    return Tag.query.filter(Tag.name.like('%{}%'.format(tag_name))).limit(10)


def find_or_create_tag(tag_name):
    tag = find_tag(tag_name)
    if tag:
        log.debug('Found tag: %s', tag)
        return tag
    tag = Tag(tag_name)
    db.session.add(tag)
    return tag


def fetch_payee(payee_id):
    return Payee.query.get(payee_id)


def tag_payee(payee_id, tag_name):
    tag = find_or_create_tag(tag_name)
    log.debug('tagging payee_id: %s with tag: %s', payee_id, tag)
    db.session.flush()
    Payee.query.filter(Payee.id == payee_id) \
        .update(dict(tag_id=tag.id))
    payee = find_payee(payee_id)
    db.session.commit()
    return payee


def untag_payee(payee_id):
    log.debug('untagging payee_id: %s', payee_id)
    Payee.query.filter(Payee.id == payee_id) \
        .update(dict(tag_id=None))
    payee = find_payee(payee_id)
    db.session.commit()
    return payee


def fetch_amounts_per_tag(account_id, start_date, end_date):
    amounts = db.session.query(
        db.func.sum(Transaction.amount).label('amount'),
        Tag.name) \
        .filter(
            Account.id == account_id,
            Transaction.date >= start_date,
            Transaction.date < end_date) \
        .join(Transaction.account) \
        .join(Transaction.payee) \
        .outerjoin(Payee.tag) \
        .group_by(Tag.name) \
        .order_by('amount') \
        .all()
    return [a._asdict() for a in amounts]


def import_ofx(ofx):
    account_number = ofx.account.number[:-4]
    acc = find_or_create_account(account_number)

    for t in ofx.account.statement.transactions:
        payee = find_or_create_payee(t.payee)
        transaction = find_transaction(t.id)
        if transaction:
            continue

        transaction = Transaction(
            id=t.id,
            account=acc,
            payee=payee,
            amount=t.amount,
            date=t.date,
            type=t.type)
        db.session.add(transaction)
