import React, { Component, PropTypes } from 'react';
import D3Funnel from 'd3-funnel';

import barColors from '../../util/bar_colors';

class Funnel extends Component {
  constructor(props) {
    super(props);
    this.divKey = this.genDivKey();
  }

  componentDidMount() {
    this.buildFunnel();
  }

  buildFunnel() {
    const data = [
      ['Emails Sent', 422, barColors[0]],
      ['Emails Opened', 398, barColors[1]],
      ['Emails Clicked', 321, barColors[2]],
      ['Orders Changed', 260, barColors[3]],
    ];
    const options = {
      block: {
        dynamicHeight: true,
        dynamicSlope: true,
        highlight: true,
      },
      chart: {
        bottomPinch: 1,
      },
      label: {
        fontSize: '18px',
      },
    };

    const chart = new D3Funnel(`#${this.divKey}`);
    chart.draw(data, options);
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
    return (
      <div id={this.divKey} style={{ height: '100%', width: '100%' }}>
      </div>
    );
  }
}

export default Funnel;
