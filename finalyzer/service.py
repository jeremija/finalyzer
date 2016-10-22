from .app import db, log, Account, Payee, Transaction


def find_or_create_account(account_number):
    acc = Account.query.get(account_number)
    if acc:
        log.debug('found acc: %s', acc)
        return acc
    acc = Account(account_number, account_number)
    log.debug('creating acc: %s', acc)
    db.session.add(acc)
    return acc


def find_or_create_payee(payee_name):
    payees = Payee.query.filter(Payee.name == payee_name).limit(1).all()
    if payees:
        log.debug('found payee: %s', payees[0])
        return payees[0]
    payee = Payee(payee_name)
    log.debug('creating payee: %s', payee)
    db.session.add(payee)
    return payee


def find_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if transaction:
        log.debug('found transaction: %s', transaction)
    return transaction


def create_transaction(transaction):
    log.debug('creating transaction: %s', transaction)
    db.session.add(transaction)


def import_ofx(ofx):
    account_number = ofx.account.number[:-4]
    acc = find_or_create_account(account_number)

    # print(dir(ofx.account.statement.transactions[0]))
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
