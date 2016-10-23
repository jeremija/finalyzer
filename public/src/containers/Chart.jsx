const PureRenderMixin = require('react-addons-pure-render-mixin');
const React = require('react');
const { Bar } = require('react-chartjs-2');
const { connect } = require('react-redux');

const Chart = React.createClass({
  propTypes: {
    transactions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  mixins: [PureRenderMixin],
  render() {
    const { transactions } = this.props;

    const data = {
      labels: [],
      datasets: [{
        label: 'Amount',
        borderWidth: 1,
        data: []
      }]
    };

    transactions.forEach(t => {
      data.labels.push(t.name || '<uncategorized>');
      data.datasets[0].data.push(Math.abs(Math.round(t.amount, 2)));
    });

    const options = {
      scales: {
          xAxes: [{
              stacked: true
          }],
          yAxes: [{
              stacked: true
          }]
      }
    };

    return <Bar data={data} options={options} />;
  }
});

function mapStateToProps(state) {
  return {
    transactions: state.aggregate.data
  };
}

module.exports = connect(mapStateToProps)(Chart);
