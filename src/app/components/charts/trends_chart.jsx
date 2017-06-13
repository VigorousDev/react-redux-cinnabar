import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import nv from 'nvd3';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

import colors from '../../util/colors';
import Loading from '../common/loading';

class Trends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: !this.props.returnDates,
    };
    this.buildChart = this.buildChart.bind(this);
    this.divKey = this.genDivKey();
    this.mount = ReactFauxDOM.createElement('svg');
  }

  componentDidMount() {
    if (!this.state.loading) {
      this.buildChart();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.returnDates && this.state.loading) {
      this.setState({ loading: false });
    }
    if (!nextProps.returnDates) {
      this.setState({
        loading: true,
      });
    }
  }

  addCommas(number) {
    if (typeof number === 'string') return number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  componentDidUpdate() {
    if (!this.state.loading) {
      this.buildChart();
    }
  }

  getReturns() {
    if (this.props.valueCount === 'value') {
      return this.props.returnValueByDate;
    }
    return this.props.returnDates;
  }

  getOrders() {
    if (this.props.valueCount === 'value') {
      return this.props.orderValueByDate;
    }
    return this.props.orderDates;
  }

  buildChart() {
    const orderDates = this.getOrders();
    const returnDates = this.getReturns();
    const parseOrderData = () => {
      const orderData = [];
      const orderDate = Object.keys(orderDates).map(key =>
        new Date(orderDates[key].value)
      );
      const orderCount = Object.keys(orderDates).map(key =>
        orderDates[key].count
      );

      for (let i = 0; i < orderDate.length; i++) {
        orderData.push({
          x: orderDate[i],
          y: orderCount[i],
        });
      }
      return orderData;
    };

    const parseReturnData = () => {
      const returnData = [];
      const returnDate = Object.keys(returnDates).map(key =>
        new Date(returnDates[key].value)
      );
      const returnCount = Object.keys(returnDates).map(key =>
        returnDates[key].count
      );

      for (let i = 0; i < returnDate.length; i++) {
        returnData.push({
          x: returnDate[i],
          y: returnCount[i],
        });
      }
      return returnData;
    };

    const data = [
      {
        key: 'Orders',
        values: parseOrderData(),
        color: colors.primary,
      },
      {
        key: 'Returns',
        values: parseReturnData(),
        color: colors.secondary,
      },
    ];

    const getYlabel = this.props.valueCount === 'value' ? 'value ($USD)' : 'count';

    const getTooltip = (obj) => {
      if (this.props.valueCount === 'value') {
        return `$${this.addCommas(obj.point.y)} worth of ${obj.series[0].key}
        on ${d3.time.format('%b %d %Y')(new Date(obj.value))}`;
      }
      return `${obj.point.y} ${obj.series[0].key} on
      ${d3.time.format('%b %d %Y')(new Date(obj.value))}`;
    };


    const format = d3.format('s');

    nv.addGraph(() => {
      const chart = nv.models.lineChart()
        .duration(250)
        .margin({ left: 85, right: 20, top: 35, bottom: 40 })
        .x(d => d.x)
        .y(d => d.y)
      ;

      chart.xAxis
        .showMaxMin(false)
        .tickFormat(d => d3.time.format('%b %e %Y')(new Date(d)))
        .tickPadding(10)
      ;

      chart.yAxis
        .showMaxMin(false)
        .tickPadding(10)
        .tickFormat(d => format(d))
        .axisLabel(getYlabel)
        .axisLabelDistance(14)
      ;

      chart.tooltip
        .classes('NVD3toolTip')
        .contentGenerator(obj => getTooltip(obj))
        .hideDelay(0)
      ;

      chart.noData('No data available. \n Adjust the filters to see data');

      d3.select(`#${this.divKey} svg`)
        .on('mouseout', () => {
          d3.selectAll('.nvtooltip').style('opacity', 0);
        })
        .datum(data)
        .transition()
        .duration(250)
        .call(chart)
      ;

      nv.utils.windowResize(chart.update);

      return chart;
    });
  }

  genDivKey() {
    let key = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 5; i ++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div id={this.divKey} style={{ height: '85%', width: '100%' }}>
        {this.mount.toReact()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    valueCount: state.UI.valueCount,
  };
}

Trends.propTypes = {
  returnDates: PropTypes.array,
  orderDates: PropTypes.array,
  returnValueByDate: PropTypes.array,
  orderValueByDate: PropTypes.array,
  valueCount: PropTypes.string,
};

export default connect(mapStateToProps)(Trends);
