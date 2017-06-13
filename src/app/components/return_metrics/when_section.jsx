import React, { PropTypes } from 'react';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';

import BarChart from '../charts/bar';
import ChartContainer from '../charts/chart_container';
import Divider from '../common/divider';
import { sortByWeekday } from '../../util/useful_functions';

const WhenSection = ({ initiationTime, weekDay, hour, cellStyle }) => (
  <Grid>
    <Cell width="1" style={cellStyle}>
      <Divider title="When" />
    </Cell>
    <Cell width="1/2" style={cellStyle}>
      <ChartContainer
        chart={
          <BarChart
            data={initiationTime}
            count="value"
            value="count"
            toolTipPartOne=" products returned with "
            toolTipPartTwo=" days between purchase and return date"
            xLabel="number of days"
            yLabel="number of returns"
          />
        }
        title="Days between delivery and return"
      />
    </Cell>
    <Cell width="1/2" style={cellStyle}>
      <ChartContainer
        chart={
          <BarChart
            data={weekDay && sortByWeekday(weekDay)}
            count="value"
            value="count"
            toolTipPartOne=" products returned on "
            toolTipPartTwo=""
            multiColor
            yLabel="number of returns"
          />
        }
        title="Returns by weekday"
      />
    </Cell>
    <Cell width="1" style={cellStyle}>
      <Divider />
    </Cell>
  </Grid>
);

WhenSection.propTypes = {
  initiationTime: PropTypes.array,
  weekDay: PropTypes.array,
  hour: PropTypes.array,
  cellStyle: PropTypes.object,
};

export default radium(WhenSection);

// <Cell width="1/2" style={cellStyle}>
//   <ChartContainer
//     chart={
//       <BarChart
//         data={hour}
//         count="value"
//         value="count"
//         toolTipPartOne=" orders returned during "
//         toolTipPartTwo=":00"
//         yLabel="number of returns"
//         xLabel="hour"
//       />
//     }
//     title="Returns by hour of the day"
//   />
// </Cell>
