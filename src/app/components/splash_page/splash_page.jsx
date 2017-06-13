import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';

import LoginModal from '../auth/login_modal_container';
import SignupModal from '../auth/signup_modal_container';
import PasswordResetModal from '../auth/password_reset_modal_container';
import colors from '../../util/colors';
import { removeTimeoutMessage } from '../../actions/auth_actions';

class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      signupOpen: false,
      resetOpen: false,
    };
    this.goDashboard = this.goDashboard.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleModals = this.toggleModals.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  toggleModals(openModal, closedModal) {
    this.handleClose(openModal);
    this.handleOpen(closedModal);
  }

  goDashboard() {
    this.props.router.push('/returnmetrics');
  }

  handleOpen(modal) {
    const obj = {};
    obj[`${modal}Open`] = true;
    this.setState(obj);
  }

  handleClose(modal) {
    const obj = {};
    obj[`${modal}Open`] = false;
    this.setState(obj);
  }

  closeSnackbar() {
    this.props.removeTimeoutMessage();
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: colors.primary,
          zIndex: 900,
        }}
      >
        <div>
          <img
            src="static/images/logo-white.png"
            role="presentation"
          />
        </div>
        <div
          style={{
            display: 'flex',
            paddingTop: 25,
          }}
        >
          <FlatButton
            label="Log In"
            style={{ backgroundColor: colors.white }}
            labelStyle={{ color: colors.adobeColors.third }}
            onClick={() => this.handleOpen('login')}
          />
        </div>
        <LoginModal
          open={this.state.loginOpen}
          handleClose={() => this.handleClose('login')}
          toggle={() => this.toggleModals('login', 'signup')}
          toggleReset={() => this.toggleModals('login', 'reset')}
        />
        <SignupModal
          open={this.state.signupOpen}
          handleClose={() => this.handleClose('signup')}
          toggle={() => this.toggleModals('signup', 'login')}
        />
        <PasswordResetModal
          open={this.state.resetOpen}
          handleClose={() => this.handleClose('reset')}
        />
        <Snackbar
          open={this.props.timeoutMessage || false}
          message="Your session has timed out, please log in again to continue"
          autoHideDuration={6000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

SplashPage.propTypes = {
  router: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
  removeTimeoutMessage: PropTypes.func.isRequired,
  timeoutMessage: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeTimeoutMessage,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.accessToken,
    timeoutMessage: state.currentUser.timeoutMessage,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SplashPage));
//<div style={{ fontSize: 150, fontWeight: 700, color: '#FFFFFF', textShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}>SUPPLY.AI</div>
