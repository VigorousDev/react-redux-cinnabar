import React, { PropTypes } from 'react';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';

import HorizontalBarChart from '../charts/horizontal_bar';
import BarChart from '../charts/bar';
import ChartContainer from '../charts/chart_container';
import Divider from '../common/divider';
import GenderFilterContainer from '../charts/gender_filter_container';

const WhySection = ({ reason, cellStyle, size, returnPercentByPurchaseQuantity }) => {
  const getByQuantity = () => {
    if (returnPercentByPurchaseQuantity) {
      const sorted = returnPercentByPurchaseQuantity.sort((a, b) => {
        if (a.count < b.count) return -1;
        if (a.count > b.count) return 1;
        return 0;
      });
      return sorted;
    }
    return returnPercentByPurchaseQuantity;
  };

  return (
    <Grid>
      <Cell width="1" style={cellStyle}>
        <Divider title="Why" />
      </Cell>
      <Cell width="1/2" style={cellStyle}>
        <ChartContainer
          chart={
            <HorizontalBarChart
              data={reason}
              toolTipPartOne=" products were returned due to "
              toolTipPartTwo=""
              count="count"
              value="value"
              limit={5}
              multiColor
              yLabel="number of returns"
            />
          }
          title="Reasons for Returns"
        />
      </Cell>
      <Cell width="1/2" style={cellStyle}>
        <ChartContainer
          filter={<GenderFilterContainer />}
          chart={
            <BarChart
              data={size}
              toolTipPartOne=" products were returned where product size was "
              toolTipPartTwo=""
              count="value"
              value="count"
              xLabel="size"
              yLabel="number of returns"
            />
          }
          title="Returns By Size"
        />
      </Cell>
      <Cell width="1/2" style={cellStyle}>
        <ChartContainer
          chart={
            <BarChart
              data={getByQuantity()}
              toolTipPartOne=" % of products were returned where "
              toolTipPartTwo=" products were ordered"
              count="count"
              value="value"
              xLabel="number of purchases"
              yLabel="orders returned (%)"
              symbol="%"
            />
          }
          title="Return Percent by Purchase Quantity"
        />
      </Cell>
      <Cell width="1" style={cellStyle}>
        <Divider />
      </Cell>
    </Grid>
  );
};

WhySection.propTypes = {
  reason: PropTypes.array,
  returnPercentByPurchaseQuantity: PropTypes.array,
  size: PropTypes.array,
  cellStyle: PropTypes.object,
};

export default radium(WhySection);
