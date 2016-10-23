const Select = require('react-select');
const React = require('react');

const AccountPicker = React.createClass({
  propTypes: {
    account: React.PropTypes.object,
    accounts: React.PropTypes.arrayOf(React.PropTypes.object),
    isLoading: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired
  },
  render() {
    const { account, accounts, isLoading, onChange } = this.props;
    return (
      <Select
        isLoading={isLoading}
        labelKey="name"
        onChange={onChange}
        options={accounts}
        value={account}
        valueKey="id"
      />
    );
  }
});

module.exports = AccountPicker;
