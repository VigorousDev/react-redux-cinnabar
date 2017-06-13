import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const EmailDialog = ({ handleClose, open, takeAction, rows, data }) => {
  const getOrderIDs = () => {
    const IDs = [];
    for (let i = 0; i < rows.length; i++) {
      const obj = data.getObjectAtSorted(rows[i]);
      IDs.push(
        obj[0]
      );
    }
    return IDs;
  };

  const dispatchTakeAction = (type) => {
    const orderIDs = getOrderIDs();
    takeAction(orderIDs, type);
  };

  const actions = [
    <FlatButton
      label="Send Email"
      onTouchTap={() => dispatchTakeAction('email')}
    />,
    <FlatButton
      label="Cancel"
      onTouchTap={() => handleClose('email')}
    />,
  ];

  return (
    <Dialog
      title="Send Email"
      actions={actions}
      modal
      open={open}
      onRequestClose={handleClose}
    >
      <div
        style={{
          width: 400,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          Hello {'<user name will go here>'},
        </div>
        <br />
        <div>
          We noticed that you ordered a different size than the usual
          and we were wondering if this order is for someone else.
          We would like to confirm the size before we ship your order.
          You will continue to receive this email until the product is shipped.
        </div>
      </div>
    </Dialog>
  );
};

EmailDialog.propTypes = {
  handleClose: React.PropTypes.func.isRequired,
  takeAction: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
  data: React.PropTypes.object.isRequired,
  rows: React.PropTypes.array,
};

export default EmailDialog;
