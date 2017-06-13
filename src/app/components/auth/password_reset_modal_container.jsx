import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import colors from '../../util/colors';
import { initiatePasswordReset, clearResetStatus } from '../../actions/auth_actions';
import PasswordResetModal from './password_reset_modal';

class PasswordResetModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeError: undefined,
      newPasswordError: undefined,
      emailError: undefined,
      message: undefined,
      resetMessage: undefined,
    };
    this.initiateReset = this.initiateReset.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateText = this.updateText.bind(this);
    this.getMessageDisplay = this.getMessageDisplay.bind(this);
    this.getMessageColor = this.getMessageColor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.codeStatus === 'failed') {
      this.setState({ message: 'Something went wrong, please try again' });
    }
    if (nextProps.codeStatus === 'success') {
      this.setState({ message: `Password Reset email sent for ${this.state.email}` });
    }
    if (nextProps.resetStatus === 'success') {
      this.setState({ resetMessage: 'Password Successfully Reset' });
    }
    if (nextProps.resetStatus === 'failed') {
      this.setState({ resetMessage: 'Invalid Email address and/or Token' });
    }
  }

  getMessageDisplay() {
    const isDisplayed = this.props.codeStatus ? 'block' : 'none';
    return isDisplayed;
  }

  getMessageColor() {
    const color = this.props.codeStatus === 'failed' ? colors.alertRed : colors.successGreen;
    return color;
  }

  clearStatus() {
    this.setState({
      codeError: undefined,
      newPasswordError: undefined,
      emailError: undefined,
      message: undefined,
      resetMessage: undefined,
    });
    this.props.clearResetStatus();
  }

  clearForms() {
    this.setState({
      email: undefined,
      newPassword: undefined,
      newPasswordConf: undefined,
      token: undefined,
    });
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validateSendCode() {
    if (!this.state.email) {
      this.setState({ emailError: 'Please enter a valid email address' });
      return false;
    }
    if (!this.validateEmail(this.state.email)) {
      this.setState({ emailError: 'Please enter a valid email address' });
      return false;
    }
    this.setState({
      emailError: null,
    });
    return true;
  }

  initiateReset() {
    this.clearStatus();
    if (this.validateSendCode()) {
      this.props.initiatePasswordReset(this.state.email);
    }
  }

  updateText(field, event) {
    const obj = {};
    obj[field] = event.target.value;
    this.setState(obj);
  }

  closeModal() {
    this.clearStatus();
    this.clearForms();
    this.props.handleClose();
  }

  render() {
    return (
      <PasswordResetModal
        open={this.props.open}
        closeModal={this.closeModal}
        updateText={this.updateText}
        emailError={this.state.emailError}
        initiateReset={this.initiateReset}
        getMessageColor={this.getMessageColor}
        getMessageDisplay={this.getMessageDisplay}
        message={this.state.message}
        codeError={this.state.codeError}
        newPasswordError={this.state.newPasswordError}
      />
    );
  }
}

PasswordResetModalContainer.propTypes = {
  initiatePasswordReset: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  clearResetStatus: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  codeStatus: PropTypes.string,
  resetStatus: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initiatePasswordReset,
    clearResetStatus,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    codeStatus: state.currentUser.codeStatus,
    resetStatus: state.currentUser.resetStatus,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetModalContainer);
