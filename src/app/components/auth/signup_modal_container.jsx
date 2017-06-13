import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createUser, clearUserCreated } from '../../actions/auth_actions';
import SignupModal from './signup_modal';

class SignupModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: undefined,
      passwordConf: undefined,
      email: undefined,
      emailError: undefined,
      passwordError: undefined,
    };
    this.createAccount = this.createAccount.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateText = this.updateText.bind(this);
    this.getSuccessDisplay = this.getSuccessDisplay.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  getSuccessDisplay() {
    const isDisplayed = this.props.userCreated ? 'block' : 'none';
    return isDisplayed;
  }

  clearForms() {
    this.setState({
      email: undefined,
      password: undefined,
      passwordConf: undefined,
    });
  }

  clearStatus() {
    this.setState({
      emailError: undefined,
      passwordError: undefined,
    });
    this.props.clearUserCreated();
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validateForm() {
    if (!this.state.email) {
      this.setState({ emailError: 'please enter a valid email address' });
      return false;
    }
    if (!this.validateEmail(this.state.email)) {
      this.setState({ emailError: 'Please enter a valid email address' });
      return false;
    }
    if (!this.state.password) {
      this.setState({ passwordError: 'please enter a valid password' });
      return false;
    }
    if (this.state.password.length < 9) {
      this.setState({ passwordError: 'Password must be at least 9 characters' });
      return false;
    }
    if (this.state.password !== this.state.passwordConf) {
      this.setState({ passwordError: 'passwords do not match' });
      return false;
    }
    return true;
  }

  createAccount() {
    this.clearStatus();
    if (this.validateForm()) {
      this.props.createUser(
        this.state.email,
        this.state.password
      );
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

  toggle() {
    this.clearStatus();
    this.clearForms();
    this.props.toggle();
  }

  render() {
    return (
      <SignupModal
        open={this.props.open}
        closeModal={this.closeModal}
        emailError={this.state.emailError}
        passwordError={this.state.passwordError}
        updateText={this.updateText}
        createAccount={this.createAccount}
        toggle={this.toggle}
        getSuccessDisplay={this.getSuccessDisplay}
        email={this.state.email}
      />
    );
  }
}

SignupModalContainer.propTypes = {
  createUser: PropTypes.func.isRequired,
  clearUserCreated: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  toggle: PropTypes.func,
  open: PropTypes.bool.isRequired,
  userCreated: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createUser,
    clearUserCreated,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    userCreated: state.currentUser.userCreated,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupModalContainer);
