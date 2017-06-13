import React, { PropTypes } from 'react';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';

import HorizontalBarChart from '../charts/horizontal_bar';
import ChartContainer from '../charts/chart_container';
import Divider from '../common/divider';

const WhatSection = ({ category, brand, cellStyle }) => (
  <Grid>
    <Cell width="1" style={cellStyle}>
      <Divider title="What" />
    </Cell>
    <Cell width="1/2" style={cellStyle}>
      <ChartContainer
        chart={
          <HorizontalBarChart
            data={category}
            count="count"
            value="value"
            limit={5}
            toolTipPartOne=" returns in the "
            toolTipPartTwo=" category"
            multiColor
            yLabel="number of returns"
          />
        }
        title="Returns by Category"
      />
    </Cell>
    <Cell width="1/2" style={cellStyle}>
      <ChartContainer
        chart={
          <HorizontalBarChart
            data={brand}
            toolTipPartOne=" returns from "
            toolTipPartTwo=""
            count="count"
            value="value"
            limit={5}
            multiColor
            yLabel="number of returns"
          />
        }
        title="Returns by Brand"
      />
    </Cell>
    <Cell width="1" style={{ paddingBottom: 20 }}>
      <div style={{ marginTop: 5, marginBottom: 5 }} />
    </Cell>
  </Grid>
);

WhatSection.propTypes = {
  category: PropTypes.array,
  cellStyle: PropTypes.object,
  brand: PropTypes.array,
};

export default radium(WhatSection);
