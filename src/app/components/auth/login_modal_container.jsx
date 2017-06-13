import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getAccessToken, clearBadLogin } from '../../actions/auth_actions';
import LoginModal from './login_modal';

class LoginModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      email: null,
    };
    this.login = this.login.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateText = this.updateText.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleReset = this.toggleReset.bind(this);
    this.getErrorDisplay = this.getErrorDisplay.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.accessToken && this.props.open) {
      this.closeModal();
      this.props.router.push('/returnmetrics');
    }
  }

  getErrorDisplay() {
    const isDisplayed = this.props.badLogin ? 'block' : 'none';
    return isDisplayed;
  }

  clearForms() {
    this.setState({
      email: undefined,
      password: undefined,
    });
  }

  clearStatus() {
    this.setState({
      passwordError: null,
      emailError: null,
    });
    this.props.clearBadLogin();
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validateForm() {
    if (!this.state.email) {
      this.setState({ emailError: 'Please enter a valid email address' });
      return false;
    }
    if (!this.validateEmail(this.state.email)) {
      this.setState({ emailError: 'Please enter a valid email address' });
      return false;
    }
    if (!this.state.password) {
      this.setState({ passwordError: 'Please enter a password' });
      return false;
    }
    return true;
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.login();
    }
  }

  login() {
    this.clearStatus();
    if (this.validateForm()) {
      this.props.getAccessToken(this.state.email, this.state.password);
    }
  }

  updateText(field, text) {
    const obj = {};
    obj[field] = text;
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

  toggleReset() {
    this.clearStatus();
    this.clearForms();
    this.props.toggleReset();
  }

  render() {
    return (
      <LoginModal
        open={this.props.open}
        closeModal={this.closeModal}
        updateText={this.updateText}
        emailError={this.state.emailError}
        passwordError={this.state.passwordError}
        login={this.login}
        toggle={this.toggle}
        toggleReset={this.toggleReset}
        getErrorDisplay={this.getErrorDisplay}
        handleKeyPress={this.handleKeyPress}
      />
    );
  }
}

LoginModalContainer.propTypes = {
  getAccessToken: PropTypes.func.isRequired,
  clearBadLogin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  toggleReset: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  badLogin: PropTypes.bool,
  accessToken: PropTypes.string,
  router: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAccessToken,
    clearBadLogin,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    badLogin: state.currentUser.badLogin,
    accessToken: state.currentUser.accessToken,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginModalContainer));
