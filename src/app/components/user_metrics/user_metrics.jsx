import React, { PropTypes } from 'react';
import { Grid, Cell } from 'radium-grid';
import radium from 'radium';

import UserSection from './user_section';

const UserMetrics = ({ data }) => {
  const {
    returnsByUserCount,
    ordersByUserCount,
    returnPercentByUserCount,
  } = data;

  const styles = {
    cell: {
      marginBottom: '1rem',
    },
  };

  return (
    <Grid>
      <Cell width="1">
        <UserSection
          returnsPerUser={returnsByUserCount}
          ordersPerUser={ordersByUserCount}
          returnPercent={returnPercentByUserCount}
          cellStyle={styles.cell}
        />
      </Cell>
    </Grid>
  );
};

UserMetrics.propTypes = {
  data: PropTypes.object,
};

export default radium(UserMetrics);
