const React = require('react');

const Container = React.createClass({
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Container;
