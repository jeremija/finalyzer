const React = require('react');
const { Router, Route, browserHistory } = require('react-router');
const Home = require('./Home.jsx');

const Routes = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Home} path="/home" />
      </Router>
    );
  }
});

module.exports = Routes;
