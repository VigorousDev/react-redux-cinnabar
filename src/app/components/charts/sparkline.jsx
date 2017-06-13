import React, { PropTypes } from 'react';
import nv from 'nvd3';
import d3 from 'd3';
import colors from '../../util/colors';

const SparkLine = (props) => {
  const genDivKey = () => {
    let key = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 5; i ++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  const divKey = genDivKey();

  const sine = () => {
    const sin = [];
    const now = new Date();
    for (let i = 0; i < 100; i++) {
      sin.push({ x: now + i * 1000 * 60 * 60 * 24, y: Math.sin(i / 10) });
    }
    return sin;
  };

  nv.addGraph(() => {
    const chart = nv.models.sparklinePlus()
      .x((d, i) => i)
      .showLastValue(false)
      .margin({ left: 0, right: 15 })
      .showMinMaxPoints(false)
      .showCurrentPoint(false)
      .width(props.width)
      .color([colors.primary])
    ;

    d3.select(`#${divKey} svg`)
      .datum(sine())
      .call(chart);
    return chart;
  });

  return (
    <div id={divKey} style={{ height: '85%', width: '100%' }}>
      <svg></svg>
    </div>
  );
};

export default SparkLine;
