import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import colors from '../../../util/colors';
import { closeSidebar } from '../../../actions/UI_actions';
import Sidebar from './sidebar';

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.goToPage = this.goToPage.bind(this);
    this.getColor = this.getColor.bind(this);
    this.handleNestedListToggle = this.handleNestedListToggle.bind(this);
  }

  getColor(item) {
    const location = window.location.href;
    if (location.includes(item)) {
      return colors.primary;
    }
    return '#D8D9D9';
  }

  handleNestedListToggle(item) {
    this.setState({
      open: item.state.open,
    });
  }

  goToPage(page) {
    this.props.closeSidebar();
    browserHistory.push(page);
  }

  render() {
    return (
      <Sidebar
        open={this.props.open}
        goToPage={this.goToPage}
        handleNestedListToggle={this.handleNestedListToggle}
        getColor={this.getColor}
        closeSidebar={this.props.closeSidebar}
      />
    );
  }
}

SidebarContainer.propTypes = {
  open: PropTypes.bool,
  closeSidebar: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeSidebar,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    open: state.UI.sidebarOpen,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
