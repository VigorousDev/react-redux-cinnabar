import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import colors from '../../util/colors';

const ResetPassword = (props) => {
  const {
    resetPassword,
    email,
    updateText,
    newPasswordError,
    resetStatus,
  } = props;

  const getColor = () => (
   resetStatus === 'success' ? colors.successGreen : colors.alertRed
  );

  const getMessage = () => (
   resetStatus === 'success' ? 'Password has been succesfully reset' :
    'Something went wrong. Please try again or contact us for assistance'
  );

  const getMessageDisplay = () => (
    resetStatus ? 'block' : 'none'
  );

  const styles = {
    formContainerStyles: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 100,
    },
    containerStyles: {
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
    },
    headerStyles: {
      paddingBottom: 25,
    },
    messageStyles: {
      color: getColor(),
      textAlign: 'center',
      paddingTop: 15,
      fontSize: 12,
      display: getMessageDisplay(),
    },
  };

  return (
    <div style={styles.containerStyles}>
      <div style={styles.formContainerStyles}>
        <div style={{ paddingBottom: 16 }}>
          <img src="static/images/logo.png" role="presentation" />
        </div>
        <div style={styles.headerStyles}>Set new password for {email}</div>
        <TextField
          hintText="New Password"
          onChange={(event) => updateText('newPassword', event)}
          errorText={newPasswordError}
          type="password"
        />
        <TextField
          hintText="Confirm New Password"
          onChange={(event) => updateText('newPasswordConf', event)}
          type="password"
        />
        <RaisedButton
          label="Set New Password"
          primary
          style={{ width: 256 }}
          onClick={resetPassword}
        />
      </div>
      <div style={styles.messageStyles}>
        {getMessage()}
      </div>
    </div>
  );
};

ResetPassword.proptTypes = {
  resetPassword: PropTypes.func.isRequired,
  email: PropTypes.string,
  updateText: PropTypes.func.isRequired,
  newPasswordError: PropTypes.string,
  resetStatus: PropTypes.string,
};

export default ResetPassword;
