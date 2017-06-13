import React, { PropTypes } from 'react';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';

import BarChart from '../charts/bar';
import ChartContainer from '../charts/chart_container';
import Divider from '../common/divider';
import GenderFilterContainer from '../charts/gender_filter_container';

const UserSection = ({ returnsPerUser, ordersPerUser, returnPercent, cellStyle }) => (
  <Grid>
    <Cell width="1" style={cellStyle}>
      <Divider title="Who" />
    </Cell>
    <Cell width="1/2" style={cellStyle}>
      <ChartContainer
        title="Returns Per User"
        filter={<GenderFilterContainer />}
        chart={
          <BarChart
            data={returnsPerUser}
            toolTipPartOne=" products were returned by "
            toolTipPartTwo=" users"
            count="value"
            value="count"
            xLabel="number of returns"
            yLabel="number of users"
          />
        }
      />
    </Cell>
    <Cell width="1/2" style={cellStyle} >
      <ChartContainer
        title="Orders Per User"
        chart={
          <BarChart
            data={ordersPerUser}
            toolTipPartOne=" products were ordered by "
            toolTipPartTwo=" users"
            count="value"
            value="count"
            xLabel="number of orders"
            yLabel="number of users"
          />
        }
      />
    </Cell>
    <Cell width="1/2" style={cellStyle} >
      <ChartContainer
        title="Percent Purchases Returned Per User"
        chart={
          <BarChart
            data={returnPercent}
            toolTipPartOne=" users returned "
            toolTipPartTwo="% of their purchased products"
            count="value"
            value="count"
            xLabel="percent of purchases (%)"
            yLabel="number of users"
          />
        }
      />
    </Cell>
    <Cell width="1" style={cellStyle}>
      <Divider />
    </Cell>
  </Grid>
);

UserSection.propTypes = {
  returnsPerUser: PropTypes.array,
  ordersPerUser: PropTypes.array,
  returnPercent: PropTypes.array,
  cellStyle: PropTypes.object.isRequired,
};

export default radium(UserSection);
