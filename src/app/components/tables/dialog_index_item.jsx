import React from 'react';
import Divider from 'material-ui/Divider';

const DialogIndexItem = ({ id, name, returnProb }) => (
  <div>
    <div style={{ display: 'flex', height: 64, justifyContent: 'space-between', flexDirection: 'column', paddingBottom: 10, paddingTop: 10 }}>
      <div style={{ display: 'flex' }} >
        <div style={{ paddingRight: 10 }}>
          Order ID:
        </div>
        <div style={{ color: '#2B323A' }}>
          {id}
        </div>
      </div>

      <div style={{ display: 'flex' }} >
        <div style={{ paddingRight: 10 }}>
          Product Name:
        </div>
        <div style={{ color: '#2B323A' }}>
          {name}
        </div>
      </div>

      <div style={{ display: 'flex' }} >
        <div style={{ paddingRight: 10 }}>
          Return Probability:
        </div>
        <div style={{ color: '#2B323A' }}>
          {returnProb}
        </div>
      </div>
    </div>
    <Divider />
  </div>
);

DialogIndexItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  returnProb: React.PropTypes.string.isRequired,
};

export default DialogIndexItem;
