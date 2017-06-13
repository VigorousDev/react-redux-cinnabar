import React, { Component, PropTypes } from 'react';
import nv from 'nvd3';
import d3 from 'd3';

import barColors from '../../util/bar_colors';
import colors from '../../util/colors';
import Loading from '../common/loading';
import ChartTableDialog from './chart_table_dialog';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: !this.props.data,
      open: false,
    };
    this.divKey = this.genDivKey();
    this.buildChart = this.buildChart.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    if (!this.state.loading) {
      this.buildChart();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && this.state.loading) {
      this.setState({ loading: false });
    }
    if (!nextProps.data) {
      this.setState({
        loading: true,
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.loading) {
      this.buildChart();
    }
  }

  genDivKey() {
    let key = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 5; i ++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleOpen(barData) {
    this.setState({
      open: true,
      barData: barData.data.label,
    });
  }

  buildChart() {
    const {
      staggerLabels,
      xLabel,
      yLabel,
      toolTipPartOne,
      toolTipPartTwo,
      multiColor,
      data,
      count,
      value,
    } = this.props;
    const parseData = () => {
      const parsedData = [];
      const xValues = Object.keys(data).map(key =>
        (data[key][count])
      );
      const yValues = Object.keys(data).map(key =>
        parseInt(data[key][value], 10)
      );

      for (let i = 0; i < xValues.length; i++) {
        const obj = {};
        obj.label = xValues[i];
        obj.value = yValues[i];
        parsedData.push(obj);
      }
      return parsedData;
    };

    const parsedData = [
      {
        key: 'Bar Chart',
        values: parseData(),
      },
    ];
    const valueFormat = d3.format('.0f');
    const axisDistance = this.props.staggerLabels ? 10 : 0;
    const getColors = () => (
      multiColor ? barColors : [colors.primary]
    );
    const getMargin = () => (
      staggerLabels ?
      { left: 65, right: 10, top: 20, bottom: 48 } :
      { left: 65, right: 10, top: 20, bottom: 40 }
    );
    const everyNthTick = (n) => {
      const ticks = [];
      for (let i = 0; i < parsedData[0].values.length; i++) {
        if (i % n === 0) {
          ticks.push(parsedData[0].values[i].label);
        }
      }
      return ticks;
    };
    const getTickValues = () => {
      if (parsedData[0].values.length <= 20) {
        return undefined;
      }
      if (parsedData[0] <= 30) {
        return everyNthTick(3);
      }
      return everyNthTick(12);
    };

    nv.addGraph(() => {
      const chart = nv.models.discreteBarChart()
        .x(d => d.label)
        .y(d => d.value)
        .color(getColors())
        .duration(250)
        .margin(getMargin())
      ;

      chart.tooltip
        .classes('NVD3toolTip')
        .contentGenerator(obj => (
          `${obj.data.value}${toolTipPartOne}${obj.data.label}${toolTipPartTwo}`
        ));

      //chart.discretebar.dispatch.on('elementClick', (barData) => this.handleOpen(barData));

      chart.xAxis
        .showMaxMin(false)
        .tickValues(getTickValues())
        .tickPadding(10)
        .staggerLabels(staggerLabels)
        .axisLabel(xLabel)
        .axisLabelDistance(axisDistance)
      ;

      chart.yAxis
        .showMaxMin(false)
        .tickFormat(valueFormat)
        .tickPadding(10)
        .axisLabel(yLabel)
      ;

      chart.noData('No data available. \n Adjust the filters to see data');

      d3.select(`#${this.divKey} svg`)
        .on('mouseout', () => {
          d3.selectAll('.nvtooltip').style('opacity', 0);
        })
        .datum(parsedData)
        .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ height: '85%', width: '100%' }}>
          <Loading size={300} />
        </div>
      );
    }
    return (
      <div id={this.divKey} style={{ height: '85%', width: '100%' }}>
        <svg></svg>
        <ChartTableDialog
          open={this.state.open}
          handleClose={this.handleClose}
          barData={this.state.barData}
          chartProps={this.props}
        />
      </div>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.array,
  count: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  toolTipPartOne: PropTypes.string.isRequired,
  toolTipPartTwo: PropTypes.string.isRequired,
  staggerLabels: PropTypes.bool,
  multiColor: PropTypes.bool,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,

};

export default BarChart;
