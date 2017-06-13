import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// import colors from '../../util/colors';

const PasswordResetModal = (props) => {
  const {
    open,
    closeModal,
    updateText,
    emailError,
    initiateReset,
    getMessageColor,
    getMessageDisplay,
    message,
    codeError,
    newPasswordError,
    getResetMessageColor,
    getResetMessageDisplay,
    resetMessage,
  } = props;

  return (
    <Dialog
      open={open}
      onRequestClose={closeModal}
      contentStyle={{
        width: 350,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="static/images/logo.png" role="presentation" />
        </div>
        <TextField
          hintText="Email Address"
          onChange={(event) => updateText('email', event)}
          errorText={emailError}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 256,
            paddingTop: 15,
          }}
        >
          <RaisedButton
            label="send password reset email"
            primary
            style={{ width: 256 }}
            onClick={initiateReset}
          />
        </div>
        <div
          style={{
            color: getMessageColor(),
            display: getMessageDisplay(),
            fontSize: 12,
            paddingTop: 20,
          }}
        >
          {message}
        </div>
      </div>
    </Dialog>
  );
};

PasswordResetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateText: PropTypes.func.isRequired,
  emailError: PropTypes.string,
  initiateReset: PropTypes.func.isRequired,
  getMessageColor: PropTypes.func.isRequired,
  getMessageDisplay: PropTypes.func.isRequired,
  message: PropTypes.string,
  codeError: PropTypes.string,
  newPasswordError: PropTypes.string,
};

export default PasswordResetModal;
