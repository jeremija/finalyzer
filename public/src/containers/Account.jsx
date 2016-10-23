const AccountPicker = require('../components/AccountPicker.jsx');
const Col = require('react-bootstrap').Col;
const Chart = require('./Chart.jsx');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const React = require('react');
const Transactions = require('../components/Transactions.jsx');
const accountActions = require('../actions/accountActions.js');
const { connect } = require('react-redux');

const Account = React.createClass({
  propTypes: {
    account: React.PropTypes.object,
    accounts: React.PropTypes.object.isRequired,
    transactions: React.PropTypes.object.isRequired
  },
  mixins: [PureRenderMixin],
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(accountActions.fetchAccounts());
  },
  // componentWillReceiveProps(nextProps) {
  //   const { dispatch } = nextProps;
  //   if (!nextProps.accounts) {
  //     dispatch(accountActions.fetchAccounts());
  //   }
  // },
  handleChangeAccount(account) {
    const { dispatch } = this.props;
    account = Array.isArray(account) ? null : account;
    dispatch(accountActions.selectAccount(account));
  },
  loadMoreTransactions() {
    console.log('load more transactions');
    const { dispatch } = this.props;
    dispatch(accountActions.fetchTransactions());
  },
  render() {
    const { account, accounts, transactions } = this.props;
    return (
      <Col>
        <h1>Welcome</h1>
        <p className="lead">Choose your account</p>
        <AccountPicker
          account={account}
          accounts={accounts.data}
          isLoading={accounts.isLoading}
          onChange={this.handleChangeAccount}
        />
        <Chart />
        <Transactions
          payeesById={transactions.payeesById}
          transactions={transactions.data}
        />
      </Col>
    );
  }
});

function mapStateToProps(state) {
  return {
    account: state.account,
    accounts: state.accounts,
    transactions: state.transactions
  };
}

module.exports = connect(mapStateToProps)(Account);
