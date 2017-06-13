import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import bowser from 'bowser';

import App from './components/App';
import Account from './components/account/account';
import Sidebar from './components/common/sidebar/sidebar_container';
import ReturnMetrics from './components/return_metrics/return_metrics_container';
import UserMetrics from './components/user_metrics/user_metrics_container';
import PreventiveAlerts from './components/preventive_alerts/preventive_alerts_container';
import ReturnsMap from './components/returns_map/returns_map_container';
import EmailTracking from './components/email_tracking/email_tracking_container';
import SplashPage from './components/splash_page/splash_page';
import ResetPassword from './components/auth/reset_password_container';
import DashboardToolbar from './components/common/header/dashboard_toolbar_container';
import CarrierAllocation from './components/carrier_allocation/carrier_allocation_container';
import LanePerformance from './components/lane_performance/lane_performance_container';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.ensureLoggedIn = this.ensureLoggedIn.bind(this);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }

  ensureLoggedIn(nextState, replace) {
    const currentState = this.context.store.getState();
    if (!currentState.currentUser.accessToken) {
      replace('/');
    }
  }

  redirectIfLoggedIn(nextState, replace) {
    const currentState = this.context.store.getState();
    if (currentState.currentUser.accessToken) {
      replace('/returnmetrics');
    }
  }

  logPageView() {
    if (!bowser.msedge && !bowser.chrome && !bowser.msie) {
      alert('The supply.ai dashboard is compatible with Chrome, Internet Explore, and Edge only. Please switch to one of those browsers.');
    }
    window.scrollTo(0, 0);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router onUpdate={this.logPageView} history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute
            components={{ splash: SplashPage }}
            onEnter={this.redirectIfLoggedIn}
          />;
          <Route
            path="returnmetrics"
            components={{ main: ReturnMetrics, sidebar: Sidebar, toolbar: DashboardToolbar }}
            onEnter={this.ensureLoggedIn}
          />;
          <Route
            path="usermetrics"
            components={{ main: UserMetrics, sidebar: Sidebar, toolbar: DashboardToolbar }}
            onEnter={this.ensureLoggedIn}
          />;
          <Route
            path="preventivealerts"
            components={{ main: PreventiveAlerts, sidebar: Sidebar, toolbar: DashboardToolbar }}
            onEnter={this.ensureLoggedIn}
          />;
          <Route
            path="returnsmap"
            components={{ main: ReturnsMap, sidebar: Sidebar, toolbar: DashboardToolbar }}
            onEnter={this.ensureLoggedIn}
          />;
          <Route
            path="resetpassword"
            components={{ main: ResetPassword }}
            onEnter={this.redirectIfLoggedIn}
          />;
          <Route
            path="account"
            components={{ main: Account, sidebar: Sidebar, toolbar: DashboardToolbar }}
            onEnter={this.ensureLoggedIn}
          />;
          <Route
            path="emailtracking"
            components={{ main: EmailTracking, sidebar: Sidebar, toolbar: DashboardToolbar }}
            onEnter={this.ensureLoggedIn}
          />;
          <Route
            path="carrierallocation"
            components={{ main: CarrierAllocation, sidebar: Sidebar, toolbar: DashboardToolbar }}
            onEnter={this.ensureLoggedIn}
          />;
          <Route
            path="laneperformance"
            components={{ main: LanePerformance, sidebar: Sidebar, toolbar: DashboardToolbar }}
            onEnter={this.ensureLoggedIn}
          />;
        </Route>
      </Router>
    );
  }
}

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default AppRouter;
