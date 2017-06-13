import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import ReactTooltip from 'react-tooltip';
import { merge } from 'lodash';

import TrendLine from './trend_line';
import colors from '../../util/colors';
import Loading from '../common/loading';

class StatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      loading: !this.props.number || this.props.number === 0,
    };
    this.getStyles = this.getStyles.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.getZDepth = this.getZDepth.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isNumber(nextProps.number) && this.state.loading) {
      this.setState({ loading: false });
    }
    if (!nextProps.number && nextProps.number !== 0) {
      this.setState({
        loading: true,
      });
    }
  }

  addCommas(number) {
    if (typeof number === 'string') return number;
    if (this.props.value) {
      const num = number.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `$${num}`;
    }
    return number.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getZDepth() {
    return this.state.hovered ? 2 : 1;
  }

  getStyles() {
    const styles = {
      paper: {
        width: '100%',
        height: 96,
        fontSize: 25,
        cursor: this.props.cursor,
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
      },
      vertBar: {
        width: '8px',
        height: '100%',
        backgroundColor: this.props.color,
        float: 'left',
      },
      infoBox: {
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 15,
        minWidth: 110,
        height: 'calc(100% - 30px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
      },
      number: {
        fontSize: 30,
      },
      label: {
        fontSize: 12,
        color: colors.darkGrey,
      },
      trends: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      },
    };
    return styles;
  }

  getTrends() {
    if (!this.props.showTrends) return null;

    const trends = (
      <div style={{ padding: 15, display: 'flex', alignItems: 'center', width: 156 }}>
        <div style={this.getStyles().trends}>
          <TrendLine trend={this.props.percentChange.day} interval="Today" />
          <TrendLine trend={this.props.percentChange.week} interval="This Week" />
          <TrendLine trend={this.props.percentChange.month} interval="This Month" />
        </div>
      </div>
    );

    return trends;
  }

  getSecondNumer() {
    if (!this.props.secondNumber) return null;

    const secondNumber = (
      <div style={merge({ width: '50%' }, this.getStyles().infoBox)}>
        <div style={this.getStyles().number}>{this.props.secondNumber}</div>
        <div style={this.getStyles().label}>{this.props.secondLabel}</div>
      </div>
    );
    return secondNumber;
  }

  isNumber(number) {
    return number || number === 0;
  }

  handleEnter() {
    this.setState({
      hovered: true,
    });
  }

  handleLeave() {
    this.setState({
      hovered: false,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Paper
          style={this.getStyles().paper}
        >
          <Loading size={30} />
        </Paper>
      );
    }
    return (
      <Paper
        style={this.getStyles().paper}
        zDepth={this.getZDepth()}
        onClick={this.props.onClick}
        data-tip={this.props.tooltip}
      >
        <ReactTooltip effect="solid" class="tooltip" place="bottom" />
        <div style={{ display: 'flex' }}>
          <div style={this.getStyles().vertBar}></div>
          <div style={this.getStyles().infoBox}>
            <div style={this.getStyles().number}>{this.addCommas(this.props.number)}</div>
            <div style={this.getStyles().label}>{this.props.stat}</div>
          </div>
        </div>
          {this.getTrends()}
          {this.getSecondNumer()}
      </Paper>
    );
  }
}

StatCard.propTypes = {
  color: React.PropTypes.string.isRequired,
  number: React.PropTypes.any,
  percentChange: React.PropTypes.object,
  stat: React.PropTypes.string.isRequired,
  cursor: React.PropTypes.string,
  onClick: React.PropTypes.func,
  showTrends: React.PropTypes.bool,
  value: React.PropTypes.bool,
  tooltip: React.PropTypes.string,
  secondNumber: React.PropTypes.string,
};

export default StatCard;
