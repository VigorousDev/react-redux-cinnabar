import React, { Component, PropTypes } from 'react';

import SignupModal from '../auth/signup_modal_container';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupOpen: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({
      signupOpen: true,
    });
  }

  handleClose() {
    this.setState({
      signupOpen: false,
    });
  }

  render() {
    return (
      <div>
        <div style={{ fontSize: 56 }}>
          Do Account things here
        </div>
        <div>
          <img src="https://media.giphy.com/media/BaFAtIGShvmo0/giphy.gif"></img>
        </div>
        <div onClick={this.handleOpen}>
          create new account (click me. I am a relic from earlier days)
        </div>
        <SignupModal open={this.state.signupOpen} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default Account;
