import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default (props) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    }}
  >
    <CircularProgress size={props.size || 300} thickness={7} />
  </div>
);
