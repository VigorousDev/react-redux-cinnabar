import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';

import DialogIndexItem from './dialog_index_item';

const ActDialogue = ({ handleClose, open, data, rows, takeAction, handleOpen }) => {
  const getOrderIDs = () => {
    const IDs = [];
    for (let i = 0; i < rows.length; i++) {
      const obj = data.getObjectAtSorted(rows[i]);
      IDs.push(
        obj[1]
      );
    }
    return IDs;
  };

  const dispatchTakeAction = (type) => {
    const orderIDs = getOrderIDs();
    if (type === 'email') {
      handleClose();
      return takeAction(orderIDs, 'response awaited');
    }
    return browserHistory.push(`/carrierallocation?order_ids=${orderIDs}`);
  };

  const buildItems = () => {
    const items = [];
    for (let i = 0; i < rows.length; i++) {
      const obj = data.getObjectAtSorted(rows[i]);
      items.push(
        <DialogIndexItem id={obj[1]} name={obj[2]} returnProb={obj[8].toFixed(2)} key={i} />
      );
    }
    return items;
  };

  const getEmailButtonFocus = () => {
    const firstItem = data.getObjectAtSorted(rows[0]);
    const returnScore = firstItem ? firstItem[8] : undefined;
    return returnScore >= 0.8;
  };

  const getEmailButtonDisabled = () => {
    const firstItem = data.getObjectAtSorted(rows[0]);
    const status = firstItem ? firstItem[9] : undefined;
    const returnScore = firstItem ? firstItem[7] : undefined;
    return status === 'response awaited' || returnScore < 0.80;
  };

  const getProcessButtonDisabled = () => {
    const firstItem = data.getObjectAtSorted(rows[0]);
    const status = firstItem ? firstItem[9] : undefined;
    const returnScore = firstItem ? firstItem[7] : undefined;
    return returnScore >= 0.80 || status === 'response awaited';
  };

  // const openEmail = () => {
  //   handleClose();
  //   handleOpen(rows, 'email');
  // }

  // const actions = [
  //   <FlatButton
  //     label="Email User"
  //     keyboardFocused
  //     primary
  //     onTouchTap={() => dispatchTakeAction('email')}
  //   />,
  //   // <FlatButton
  //   //   label="Call User"
  //   //   onTouchTap={() => dispatchTakeAction('call')}
  //   // />,
  //   <div style={{ width: 400 }}>
  //   </div>,
  //   <FlatButton
  //     label="Process Order"
  //     secondary
  //     onTouchTap={() => dispatchTakeAction('process')}
  //   />,
  //   <FlatButton
  //     label="Cancel"
  //     onTouchTap={handleClose}
  //   />,
  // ];
  const actions = (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <FlatButton
        label="Email User"
        keyboardFocused={getEmailButtonFocus()}
        primary
        onTouchTap={() => dispatchTakeAction('response awaited')}
      />
      <div style={{ display: 'flex' }}>
        <FlatButton
          label="Process Order"
          secondary
          onTouchTap={() => dispatchTakeAction('shipped')}
        />
        <FlatButton
          label="Cancel"
          onTouchTap={handleClose}
        />
      </div>
    </div>
  );

  return (
    <Dialog
      title="Take Action"
      actions={actions}
      modal
      open={open}
      onRequestClose={handleClose}
    >
      <div
        style={{
          maxHeight: 500,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {buildItems()}
      </div>
    </Dialog>
  );
};

ActDialogue.propTypes = {
  handleClose: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
  open: React.PropTypes.bool.isRequired,
  rows: React.PropTypes.array,
  takeAction: React.PropTypes.func.isRequired,
  handleOpen: React.PropTypes.func.isRequired,
};

export default ActDialogue;