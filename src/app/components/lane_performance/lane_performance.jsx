import React, { PropTypes } from 'react';

import LanePerformanceCard from './lane_performance_card';

const LanePerformance = (props) => {
  const styles = {
    container: {
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <LanePerformanceCard
        lanes={props.lanes}
        getLanes={props.getLanes}
        laneData={props.laneData}
      />
    </div>
  );
};

export default LanePerformance;
