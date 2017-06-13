import React, { PropTypes } from 'react';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';

import TrendsSection from './trends_section';
import WhatSection from './what_section';
import WhySection from './why_section';
import WhereSection from './where_section';
import CostSection from './cost_section';
import WhenSection from './when_section';

const ReturnMetrics = ({ data, cityDrilldown, UI }) => {
  const {
    returnsByReason,
    returnsByLocation,
    returnsByCategory,
    returnsByInitiaionTime,
    totalOrders,
    totalReturns,
    returnsByPrice,
    returnsByCost,
    returnsByRelativeCost,
    returnsByDate,
    ordersByDate,
    returnsByBrand,
    returnsByWeekday,
    returnsByHour,
    returnsBySize,
    returnPercentChange,
    orderPercentChange,
    returnPercentByPurchaseQuantity,
    returnPercentByCity,
    returnValueByDate,
    orderValueByDate,
    totalOrderValue,
    totalReturnValue,
    returnValueTrends,
    orderValueTrends,
    returnValuePrevented,
  } = data;

  const styles = {
    cell: {
      marginBottom: 15,
    },
  };

  return (
    <Grid>
      <Cell width="1">
        <TrendsSection
          returnDate={returnsByDate}
          orderDate={ordersByDate}
          totalOrders={totalOrders}
          totalReturns={totalReturns}
          cellStyle={styles.cell}
          returnPercentChange={returnPercentChange}
          orderPercentChange={orderPercentChange}
          initiationTime={returnsByInitiaionTime}
          returnValueByDate={returnValueByDate}
          orderValueByDate={orderValueByDate}
          totalOrderValue={totalOrderValue}
          totalReturnValue={totalReturnValue}
          returnValueTrends={returnValueTrends}
          orderValueTrends={orderValueTrends}
          returnValuePrevented={returnValuePrevented}
          UI={UI}
        />
      </Cell>

      <Cell width="1">
        <WhatSection
          category={returnsByCategory}
          brand={returnsByBrand}
          cellStyle={styles.cell}
        />
      </Cell>

      <Cell width="1">
        <WhySection
          reason={returnsByReason}
          size={returnsBySize}
          returnPercentByPurchaseQuantity={returnPercentByPurchaseQuantity}
          cellStyle={styles.cell}
        />
      </Cell>

      <Cell width="1">
        <WhereSection
          returnsByLocation={returnsByLocation}
          returnPercentByCity={returnPercentByCity}
          cityDrilldown={cityDrilldown}
          cellStyle={styles.cell}
        />
      </Cell>

      <Cell width="1">
        <CostSection
          cost={returnsByCost}
          price={returnsByPrice}
          relativeCost={returnsByRelativeCost}
          cellStyle={styles.cell}
        />
      </Cell>

      <Cell width="1">
        <WhenSection
          initiationTime={returnsByInitiaionTime}
          weekDay={returnsByWeekday}
          hour={returnsByHour}
          cellStyle={styles.cell}
        />
      </Cell>
    </Grid>
  );
};

ReturnMetrics.propTypes = {
  data: PropTypes.object.isRequired,
  cityDrilldown: PropTypes.object.isRequired,
};

export default radium(ReturnMetrics);
