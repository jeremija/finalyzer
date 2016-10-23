const { Button, ListGroup } = require('react-bootstrap');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const React = require('react');
const Transaction = require('./Transaction.jsx');
const accountActions = require('../actions/accountActions.js');
const { connect } = require('react-redux');

const Transactions = React.createClass({
  propTypes: {
    hasMore: React.PropTypes.bool.isRequired,
    loadMore: React.PropTypes.func.isRequired,
    onSetTag: React.PropTypes.func.isRequired,
    payeesById: React.PropTypes.object,
    transactions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  mixins: [PureRenderMixin],
  loadMore() {
    const { dispatch } = this.props;
    dispatch(accountActions.fetchTransactions());
  },
  handleSetTag(payee, tagName) {
    const { dispatch } = this.props;
    dispatch(accountActions.tagOrUntagPayee(payee, tagName));
  },
  render() {
    const {
      hasMore,
      payeesById,
      transactions
    } = this.props;

    console.log('tu sam');

    const transactionsItems = transactions.map(transaction => {
      const payee = payeesById[transaction.payee_id];
      return (
        <Transaction
          key={transaction.id}
          onSetTag={this.handleSetTag}
          payee={payee}
          transaction={transaction}
        />
      );
    });

    return (
      <div className="transactions">
        <ListGroup>
          {transactionsItems}
        </ListGroup>
        <center>
          <Button bsSize="xsmall" onClick={this.loadMore}>Load more</Button>
        </center>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    hasMore: state.transactions.hasMore
  };
}
module.exports = connect(mapStateToProps)(Transactions);
