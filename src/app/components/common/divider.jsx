import React from 'react';
import colors from '../../util/colors';

const Divider = (props) => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 10,
    }}
  >

    <div
      style={{
        whiteSpace: 'nowrap',
        fontSize: 20,
      }}
    >
      {props.title}
    </div>

  </div>
);

export default Divider;
