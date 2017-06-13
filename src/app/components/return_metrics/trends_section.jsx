import React, { PropTypes } from 'react';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';

import StatCard from './stat_card';
import ChartContainer from '../charts/chart_container';
import Trends from '../charts/trends_chart';
import colors from '../../util/colors';
import Divider from '../common/divider';
import TrendsIntervalFilterContainer from '../charts/trends_interval_filter_container';
import ValueCountToggle from './value_count_toggle';

const TrendsSection = ({ totalOrders,
  totalReturns,
  cellStyle,
  returnDate,
  orderDate,
  orderPercentChange,
  returnPercentChange,
  initiationTime,
  returnValueByDate,
  orderValueByDate,
  totalOrderValue,
  totalReturnValue,
  orderValueTrends,
  returnValueTrends,
  returnValuePrevented,
  UI,
}) => {
  const getStatCards = () => {
    if (UI.valueCount === 'count') {
      return ([
        <StatCard
          color={colors.successGreen}
          stat={'Ordered'}
          number={getTotalOrders() || '0'}
          showTrends
          percentChange={orderPercentChange}
        />,
        <StatCard
          color={colors.highRed}
          stat={'Returned'}
          number={getTotalReturns()}
          showTrends
          percentChange={returnPercentChange}
        />,
        <StatCard
          color={'#9E9E9E'}
          stat={'Percent Returns'}
          number={getPercent()}
          secondNumber={getT7()}
          secondLabel={'Seven Day Return Rate'}
        />,
      ]);
    }
    return ([
      <StatCard
        color={colors.successGreen}
        stat={'Worth of Orders'}
        number={getTotalOrderValue()}
        showTrends
        percentChange={orderValueTrends}
        value
      />,
      <StatCard
        color={colors.highRed}
        stat={'Worth of Returns'}
        number={getTotalReturnValue()}
        showTrends
        percentChange={returnValueTrends}
        value
      />,
      <StatCard
        color={colors.primary}
        stat={'Returns Prevented'}
        number={getReturnValuePrevented()}
        value
      />,
    ]);
  };

  const getPercent = () => {
    if (totalReturns && totalOrders) {
      if (totalOrders[0].count === 0) return 0;
      const num = Math.round(totalReturns[0].count / totalOrders[0].count * 100 * 10) / 10;
      return `${num}%`;
    }
    return null;
  };

  const getTotalOrders = () => {
    if (totalOrders) {
      return totalOrders[0].count;
    }
    return null;
  };

  const getReturnValuePrevented = () => {
    if (returnValuePrevented) {
      return returnValuePrevented[0].value;
    }
    return null;
  };

  const getTotalReturns = () => {
    if (totalReturns) {
      return totalReturns[0].count;
    }
    return null;
  };

  const getTotalReturnValue = () => {
    if (totalReturnValue) {
      return totalReturnValue[0].value;
    }
    return null;
  };

  const getTotalOrderValue = () => {
    if (totalOrderValue) {
      return totalOrderValue[0].value;
    }
    return null;
  };

  const getT7 = () => {
    if (initiationTime && totalOrders) {
      const total = totalOrders[0].count;
      const sevenDayCount = initiationTime
        .filter(v => v.value <= 7)
        .map(v => v.count)
        .reduce((a, b) => a + b);
      if (sevenDayCount) {
        const num = Math.round(sevenDayCount / total * 100 * 10) / 10;
        return `${num}%`;
      }
      return '0%';
    }
    return null;
  };

  return (
    <Grid>
      <Cell width="1" style={cellStyle}>
        <Divider title="Trends" />
      </Cell>
      <Cell width="1" style={cellStyle} align="middle">
        <ValueCountToggle />
      </Cell>
      <Cell width="1/3" mediumWidth="1/2" smallWidth="1" style={cellStyle}>
        {getStatCards()[0]}
      </Cell>
      <Cell width="1/3" mediumWidth="1/2" smallWidth="1" style={cellStyle}>
        {getStatCards()[1]}
      </Cell>
      <Cell width="1/3" mediumWidth="1/2" smallWidth="1" style={cellStyle}>
        {getStatCards()[2]}
      </Cell>
      <Cell width="1" style={cellStyle}>
        <ChartContainer
          height={384}
          filter={<TrendsIntervalFilterContainer />}
          chart={
            <Trends
              returnDates={returnDate}
              orderDates={orderDate}
              returnValueByDate={returnValueByDate}
              orderValueByDate={orderValueByDate}
            />
          }
          title="Orders and Returns"
        />
      </Cell>
      <Cell width="1" style={{ paddingBottom: 20 }}>
        <div style={{ marginTop: 5, marginBottom: 5 }} />
      </Cell>
    </Grid>
  );
};

TrendsSection.propTypes = {
  totalOrders: PropTypes.array,
  totalReturns: PropTypes.array,
  returnValueByDate: PropTypes.array,
  orderValueByDate: PropTypes.array,
  initiationTime: PropTypes.array,
  returnDate: PropTypes.array,
  orderDate: PropTypes.array,
  cellStyle: PropTypes.object.isRequired,
  orderPercentChange: PropTypes.object,
  returnPercentChange: PropTypes.object,
};

export default radium(TrendsSection);
