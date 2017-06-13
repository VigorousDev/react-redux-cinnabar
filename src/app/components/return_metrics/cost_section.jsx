import React, { PropTypes } from 'react';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';

import BarChart from '../charts/bar';
import ChartContainer from '../charts/chart_container';
import Divider from '../common/divider';

const CostSection = ({ price, cost, relativeCost, cellStyle }) => (
  <Grid>
    <Cell width="1" style={cellStyle}>
      <Divider title="Value" />
    </Cell>
    <Cell width="1/2" style={cellStyle}>
      <ChartContainer
        chart={
          <BarChart
            data={price}
            toolTipPartOne=" products returned within the $"
            toolTipPartTwo=" price range"
            count="value"
            value="count"
            staggerLabels
            xLabel="price range ($USD)"
            yLabel="number of returns"
          />
        }
        title="Returns by Price Range"
      />
    </Cell>
    <Cell width="1/2" style={cellStyle}>
      <ChartContainer
        chart={
          <BarChart
            data={cost}
            toolTipPartOne=" products returned within the $"
            toolTipPartTwo=" return cost range"
            count="value"
            value="count"
            staggerLabels
            xLabel="return cost range ($USD)"
            yLabel="number of returns"
          />
        }
        title="Returns by Cost Range"
      />
    </Cell>
    <Cell width="1/2" style={cellStyle}>
      <ChartContainer
        chart={
          <BarChart
            data={relativeCost}
            toolTipPartOne=" products returned within the "
            toolTipPartTwo="% product price to return cost range"
            count="value"
            value="count"
            xLabel="relative return cost  (return cost / product price) range"
            yLabel="number of returns"
          />
        }
        title="Returns by Relative Cost"
      />
    </Cell>
    <Cell width="1" style={cellStyle}>
      <Divider />
    </Cell>
  </Grid>
);

CostSection.propTypes = {
  price: PropTypes.array,
  cost: PropTypes.array,
  relativeCost: PropTypes.array,
  cellStyle: PropTypes.object,
};

export default radium(CostSection);

// <Cell width="1" style={cellStyle}>
//   <ChartContainer
//     chart={
//       <BulletChart
//         relativeCost={relativeCost}
//         cost={cost}
//         price={price}
//       />
//     }
//     title="Product Value Breakdown"
//   />
// </Cell>
