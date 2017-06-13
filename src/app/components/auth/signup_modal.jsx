import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import colors from '../../util/colors';

const SignupModal = (props) => {
  const {
    open,
    closeModal,
    emailError,
    passwordError,
    updateText,
    createAccount,
    toggle,
    getSuccessDisplay,
    email,
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
          errorText={emailError}
          onChange={(event) => updateText('email', event)}
        />
        <TextField
          hintText="Password"
          type="password"
          errorText={passwordError}
          onChange={(event) => updateText('password', event)}
        />
        <TextField
          hintText="Confirm Password"
          type="password"
          onChange={(event) => updateText('passwordConf', event)}
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
            label="Create Account"
            primary
            style={{ width: 256 }}
            onClick={createAccount}
          />
        </div>

        <div
          style={{
            display: 'flex',
            width: 256,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 15,
            fontSize: 10,
          }}
        >
          <div>Already have an account?</div>
          <FlatButton
            labelStyle={{
              fontSize: 10,
            }}
            label="Log In"
            onClick={toggle}
          />
        </div>
        <div
          style={{
            color: colors.successGreen,
            display: getSuccessDisplay(),
            fontSize: 12,
          }}
        >
          Account: {email} Succesfully Created
        </div>
      </div>
    </Dialog>
  );
};

SignupModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  updateText: PropTypes.func.isRequired,
  createAccount: PropTypes.func.isRequired,
  getSuccessDisplay: PropTypes.func.isRequired,
  email: PropTypes.string,
};

export default SignupModal;
