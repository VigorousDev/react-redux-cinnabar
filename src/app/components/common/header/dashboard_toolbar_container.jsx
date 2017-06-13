import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DashboardToolbar from './dashboard_toolbar';
import { logOut } from '../../../actions/auth_actions';
import { openSidebar, closeSidebar } from '../../../actions/UI_actions';

class DashboardToolbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.logUserOut = this.logUserOut.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handlePopover = this.handlePopover.bind(this);
  }

  handleRequestClose() {
    this.setState({
      menuOpen: false,
    });
  }

  handlePopover(event) {
    event.preventDefault();
    this.setState({
      menuOpen: true,
      anchorEl: event.curentTarget
    });
  }

  logUserOut() {
    this.props.logOut();
    browserHistory.push('/');
  }

  goSplash() {
    browserHistory.push('/');
  }

  toggleSidebar() {
    return this.props.sidebarOpen ? this.props.closeSidebar() : this.props.openSidebar();
  }

  isDisabled() {
    return window.location.pathname === '/preventivealerts' || window.location.pathname === '/emailtracking';
  }

  showFilters() {
    return window.location.pathname !== '/account';
  }

  goAccount() {
    browserHistory.push('/account');
  }

  render() {
    return (
      <DashboardToolbar
        logout={this.logUserOut}
        toggleSidebar={this.toggleSidebar}
        isDisabled={this.isDisabled}
        handlePopover={this.handlePopover}
        handleRequestClose={this.handleRequestClose}
        menuOpen={this.state.menuOpen}
        anchorEl={this.state.anchorEl}
        goAccount={this.goAccount}
        showFilters={this.showFilters}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logOut,
    openSidebar,
    closeSidebar,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    sidebarOpen: state.UI.sidebarOpen,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardToolbarContainer);
