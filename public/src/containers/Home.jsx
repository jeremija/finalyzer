const { connect } = require('react-redux');
const AccountPicker = require('../components/AccountPicker.jsx');
const Col = require('react-bootstrap').Col;
const PureRenderMixin = require('react-addons-pure-render-mixin');
const React = require('react');
const accountActions = require('../actions/accountActions.js');

const Home = React.createClass({
  propTypes: {
    account: React.PropTypes.object,
    accounts: React.PropTypes.object.isRequired
  },
  mixins: [PureRenderMixin],
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(accountActions.fetchAccounts());
  },
  componentWillReceiveProps(nextProps) {
    // const { dispatch } = nextProps;
    // if (!nextProps.accounts) {
    //   dispatch(accountActions.fetchAccounts());
    // }
  },
  handleChangeAccount(account) {
    const { dispatch } = this.props;
    account = Array.isArray(account) ? null : account;
    dispatch(accountActions.selectAccount(account));
  },
  render() {
    const { account, accounts } = this.props;
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
      </Col>
    );
  }
});

function mapStateToProps(state) {
  return {
    account: state.account,
    accounts: state.accounts,
    transactions: state.transactions || []
  };
}

module.exports = connect(mapStateToProps)(Home);
