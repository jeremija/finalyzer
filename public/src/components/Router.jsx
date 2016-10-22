const React = require('react');
const { Router, Route, browserHistory } = require('react-router');
const Container = require('./Container.jsx');
const Home = require('./Home.jsx');

const Routes = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Container} path="/">
          <Route component={Home} path="/home" />
        </Route>
      </Router>
    );
  }
});

module.exports = Routes;
