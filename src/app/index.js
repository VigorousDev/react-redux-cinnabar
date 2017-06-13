import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactGA from 'react-ga';

import materialUITheme from './util/material_ui_theme';
import rootReducer from './reducers/index';
import AppRouter from './routes';
import rootMiddleware from './middleware/index';
import { loadState, saveState } from './util/local_storage';

import './style_sheets/bundle.scss';

ReactGA.initialize('UA-89104895-1', {
  debug: false,
});

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://a8a1612f48cd4eacb68628ea74d38418@s.supply.ai/6').install();
}

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  rootMiddleware
);

store.subscribe(throttle(() => {
  saveState({
    // returnMetricsData: store.getState().returnMetricsData,
    // userMetricsData: store.getState().userMetricsData,
    // preventiveAlerts: store.getState().preventiveAlerts,
    currentUser: store.getState().currentUser,
    filters: store.getState().filters,
  });
}, 1000));

// this is required for material-ui
injectTapEventPlugin();

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={materialUITheme}>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('react-root'));
