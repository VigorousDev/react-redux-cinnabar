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
      data,
      count,
      value,
      toolTipPartOne,
      toolTipPartTwo,
      limit,
      xLabel,
      yLabel,
      multiColor,
    } = this.props;

    const getColors = () => (
      multiColor ? barColors : [colors.primary]
    );

    const valueFormat = d3.format('.0f');

    const getYOffset = (label) => {
      if (!label) {
        return 0;
      }
      return label.length > 15 ? -10 : 0;
    };

    const labelFormat = function (d) {
      if (typeof this !== 'undefined') {
        const el = d3.select(this);
        const p = d3.select(this.parentNode);
        p.append('foreignObject')
        .attr('x', -100)
        .attr('y', getYOffset(d))
        .attr('width', 90)
        .attr('height', 200)
        .append('xhtml:p')
        .attr('style', 'word-wrap: break-word; text-align:center; font-size: 12px')
        .html(d);

        el.remove();
        return d;
      }
    };

    const parseData = () => {
      const parsedData = [];
      const yValues = Object.keys(data).map(key =>
        data[key][count]
      );
      const xValues = Object.keys(data).map(key =>
        data[key][value]
      );

      const parsedLimit = limit > xValues.length ? xValues.length : limit;
      for (let i = 0; i < parsedLimit; i++) {
        const obj = {};
        obj.label = xValues[i] || 'No Reason';
        obj.value = yValues[i];
        parsedData.push(obj);
      }
      return parsedData;
    };

    const parsedData = [
      {
        key: 'Horizontal Bar Chart',
        values: parseData(),
      },
    ];

    nv.addGraph(() => {
      const chart = nv.models.multiBarHorizontalChart()
        .x(d => d.label)
        .y(d => d.value)
        .barColor(getColors())
        .duration(250)
        .showControls(false)
        .showLegend(false)
        .margin({ left: 100, right: 10, top: 20, bottom: 40 })
        .stacked(true)
      ;

      chart.tooltip
      .classes('NVD3toolTip')
      .contentGenerator(obj => (
        `${obj.data.value}${toolTipPartOne}${obj.data.label}${toolTipPartTwo}`
      ));

      //chart.multibar.dispatch.on('elementClick', (barData) => this.handleOpen(barData));

      chart.xAxis
        .tickPadding(10)
        .tickFormat(labelFormat)
        .axisLabel(xLabel)
      ;

      chart.yAxis
        .showMaxMin(false)
        .tickPadding(10)
        .tickFormat(valueFormat)
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
          <Loading size={250} />
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
  limit: PropTypes.number,
  multiColor: PropTypes.bool,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

export default BarChart;
