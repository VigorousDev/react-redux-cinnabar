import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import colors from '../../util/colors';
const LoginModal = (props) => {
  const {
    open,
    closeModal,
    updateText,
    emailError,
    passwordError,
    login,
    toggle,
    toggleReset,
    getErrorDisplay,
    handleKeyPress,

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
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 25 }}>
          <img src="static/images/logo.png" />
        </div>
        <TextField
          hintText="Email Address"
          onChange={(event) => updateText('email', event.target.value.toLowerCase())}
          errorText={emailError}
          onKeyPress={handleKeyPress}
        />
        <TextField
          hintText="Password"
          type="password"
          onChange={(event) => updateText('password', event.target.value)}
          errorText={passwordError}
          onKeyPress={handleKeyPress}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 256,
            paddingTop: 10,
          }}
        >
          <Checkbox style={{ width: 30 }} iconStyle={{ fill: colors.darkGrey }} />
          <div style={{ fontSize: 12 }}>Keep me logged in</div>
        </div>

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
            label="Log In"
            primary
            style={{ width: 256 }}
            onClick={login}
          />
        </div>

        <div
          style={{
            display: 'flex',
            width: 256,
            justifyContent: 'center',
            paddingTop: 15,
          }}
        >
          <FlatButton
            labelStyle={{
              fontSize: 9,
            }}
            label="Forgot Password?"
            onClick={toggleReset}
          />
        </div>
        <div
          style={{
            color: colors.alertRed,
            display: getErrorDisplay(),
            fontSize: 12,
          }}
        >
          Username/password combination was incorrect
        </div>
      </div>
    </Dialog>
  );
};

LoginModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  toggleReset: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateText: PropTypes.func.isRequired,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  login: PropTypes.func.isRequired,
  getErrorDisplay: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

export default LoginModal;
