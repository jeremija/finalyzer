const { connect } = require('react-redux');
const React = require('react');
const Col = require('react-bootstrap').Col;

const Home = React.createClass({
  propTypes: {
    test: React.PropTypes.string.isRequired
  },
  render() {
    const { test } = this.props;
    return (
      <Col>
        <h1>Welcome</h1>
        <p className="lead">Work under construction</p>
        <p>Test value: {test}</p>
      </Col>
    );
  }
});

function mapStateToProps(state) {
  return { test: 'test' };
}

module.exports = connect(mapStateToProps)(Home);
