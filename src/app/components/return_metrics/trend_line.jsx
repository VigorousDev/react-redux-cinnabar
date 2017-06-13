import React, { Component, PropTypes } from 'react';
import Tooltip from 'material-ui/internal/Tooltip';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import TrendingFlat from 'material-ui/svg-icons/action/trending-flat';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import colors from '../../util/colors';

class TrendLine extends Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.buildTrend = this.buildTrend.bind(this);
  }

  onMouseOver() {
    this.setState({ hovered: false });
  }

  onMouseOut() {
    this.setState({ hovered: false });
  }

  buildTrend() {
    const style = { height: 30, width: 30 };
    const flat = <TrendingFlat color={colors.darkGrey} style={style} />;
    const up = <TrendingUp color={colors.successGreen} style={style} />;
    const down = <TrendingDown color={colors.alertRed} style={style} />;

    if (this.props.trend > 0) {
      return up;
    }
    if (this.props.trend < 0) {
      return down;
    }
    return flat;
  }

  render() {
    const styles = {
      line: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 13,
        justifyContent: 'space-between',
        color: colors.darkGrey,
      },
    };

    return (
      <div
        style={styles.line}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div style={{ fontSize: 10 }}>{this.props.interval}</div>
        {this.buildTrend()}
        {`${this.props.trend.toFixed(0)}%`}
        <Tooltip
          show={this.state.hovered}
          label={this.props.interval}
          horizontalPosition="right"
          verticalPosition="bottom"
          style={{ top: 105 }}
        />
      </div>
    );
  }
}

TrendLine.propTypes = {
  interval: PropTypes.string.isRequired,
  trend: PropTypes.number.isRequired,
};

export default TrendLine;
// <div>{this.props.trend.replace('-', '').replace('+', (''))}</div>
