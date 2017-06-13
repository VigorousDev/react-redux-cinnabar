import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearResetStatus, resetPassword } from '../../actions/auth_actions';
import ResetPassword from './reset_password';

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: undefined,
      newPasswordConf: undefined,
    };
    this.resetPassword = this.resetPassword.bind(this);
    this.updateText = this.updateText.bind(this);
    this.validateNewPassword = this.validateNewPassword.bind(this);
    this.clearForms = this.clearForms.bind(this);
  }

  componentDidMount() {
    this.getQueryFromURL();
  }

  componentWillUnmount() {
    this.props.clearResetStatus();
  }

  getQueryFromURL() {
    this.setState({
      email: this.props.location.query.email,
      token: this.props.location.query.token,
    });
  }

  resetPassword() {
    this.clearForms();
    const { newPassword, email, token } = this.state;
    if (this.validateNewPassword()) {
      this.props.resetPassword(email, newPassword, token);
    }
  }

  clearForms() {
    this.props.clearResetStatus();
    this.setState({
      newPasswordError: undefined,
    });
  }

  updateText(field, event) {
    const obj = {};
    obj[field] = event.target.value;
    this.setState(obj);
  }

  validateNewPassword() {
    if (!this.state.newPassword) {
      this.setState({ newPasswordError: 'Please enter a password' });
      return false;
    }
    if (this.state.newPassword.length < 9) {
      this.setState({ newPasswordError: 'Password must be at least 9 characters' });
      return false;
    }
    if (this.state.newPassword !== this.state.newPasswordConf) {
      this.setState({ newPasswordError: 'Password and confirmation do not match' });
      return false;
    }
    return true;
  }

  render() {
    return (
      <ResetPassword
        resetPassword={this.resetPassword}
        newPasswordError={this.state.newPasswordError}
        updateText={this.updateText}
        email={this.state.email}
        resetStatus={this.props.resetStatus}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetPassword,
    clearResetStatus,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    resetStatus: state.currentUser.resetStatus,
  };
}

ResetPasswordContainer.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  clearResetStatus: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  resetStatus: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPasswordContainer));
