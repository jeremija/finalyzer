const {
  Button,
  FormControl,
  ListGroupItem,
  Label
} = require('react-bootstrap');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const React = require('react');
const moment = require('moment');

const Transaction = React.createClass({
  propTypes: {
    onSetTag: React.PropTypes.func.isRequired,
    payee: React.PropTypes.object.isRequired,
    transaction: React.PropTypes.object.isRequired
  },
  mixins: [PureRenderMixin],
  getInitialState() {
    return { isEdit: false, tagName: '' };
  },
  handleEdit() {
    const { payee } = this.props;
    const tagName = payee.tag && payee.tag.name || '';
    this.setState({ isEdit: true, tagName });
  },
  handleChange(e) {
    const tagName = e.target.value || '';
    this.setState({ tagName });
  },
  handleSetTag() {
    const { onSetTag, transaction } = this.props;
    const { tagName } = this.state;
    this.setState({ isEdit: false });
    onSetTag(transaction.payee, tagName);
  },
  render() {
    const { isEdit } = this.state;
    const { transaction, payee } = this.props;
    const tagName = payee.tag && payee.tag.name;
    const date = moment(transaction.date).format('YYYY-MM-DD');

    let label = <Label>{tagName}</Label>;
    let editButton = (
      <Button bsSize="xsmall" onClick={this.handleEdit}>Tag</Button>
    );
    if (isEdit) {
      label = (
        <FormControl
          autoFocus
          onBlur={this.handleSetTag}
          onChange={this.handleChange}
          placeholder="Enter tag"
          type="text"
          value={this.state.tagName}
        />
      );
      editButton = null;
    }

    return (
      <ListGroupItem>
        {date}&nbsp;
        {editButton}&nbsp;
        {label}&nbsp;
        {payee.name}&nbsp;
        <span className="pull-right">{transaction.amount}</span>
      </ListGroupItem>
    );
  }
});

module.exports = Transaction;
