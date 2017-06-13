import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import ChartTableContainer from '../tables/chart_table_container';

const ChartTableDialog = (props) => {
  const actions = (
    <div>
      <FlatButton
        label="Close"
        keyboardFocused
        primary
        onTouchTap={props.handleClose}
      />
    </div>
  );

  return (
    <Dialog
      title={`${props.chartProps.title}: ${props.barData}`}
      actions={actions}
      open={props.open}
      onRequestClose={props.handleClose}
    >
      <ChartTableContainer chartProps={props.chartProps} barData={props.barData} />
    </Dialog>
  );
};

export default ChartTableDialog;
