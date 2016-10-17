from ofxparse.ofxparse import OfxParser
from .app import db, Account, Payee, Transaction


def find_or_create_account(account_number):
    acc = Account.query.get(account_number)
    if acc:
        print('found acc:', acc)
        return acc
    acc = Account(account_number)
    db.session.add(acc)
    print('created acc:', acc)
    return acc


def find_or_create_payee(payee_name):
    payees = Payee.query.filter(Payee.name == payee_name).limit(1).all()
    if payees:
        print('found payee:', payees[0])
        return payees[0]
    payee = Payee(payee_name)
    db.session.add(payee)
    print('created payee:', payee)
    return payee


def find_or_create_transaction(payee, transaction):
    t = Transaction.query.get(transaction.id)
    if t:
        print('transaction already exists:', t)
        return t

    payee.transactions.append(transaction)
    print('added transaction:', transaction)
    return transaction


def import_ofx(ofx):
    account_number = ofx.account.number[:-4]
    acc = Account(account_number)
    acc.id = account_number

    # print(dir(ofx.account.statement.transactions[0]))
    for t in ofx.account.statement.transactions:
        payee = find_or_create_payee(t.payee)

        transaction = Transaction(
            id=t.id,
            amount=t.amount,
            date=t.date,
            type=t.type)

        transaction = find_or_create_transaction(payee, transaction)

    db.session.commit()


with open('~/Downloads/Chase.QFX', 'rb') as f:
    ofx = OfxParser.parse(f)
    import_ofx(ofx)
