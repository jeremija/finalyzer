const React = require('react');
const { Router, Route, IndexRoute } = require('react-router');
const Layout = require('./Layout.jsx');
const Transactions = require('./Transactions.jsx');

const Routes = React.createClass({
  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Route component={Layout} path="/app">
          <IndexRoute component={Transactions} />
        </Route>
      </Router>
    );
  }
});

module.exports = Routes;
