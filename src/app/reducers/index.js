import { combineReducers } from 'redux';

import AuthReducer from './auth_reducer';
import FiltersReducer from './filters_reducer';
import PreventiveAlertsReducer from './preventive_alerts_reducer';
import UIReducer from './UI_reducer';
import DataReducer from './data_reducer';
import CarrierAllocation from './carrier_allocation_reducer';
import LanePerformance from './lane_performance_reducer';
import PackageTracking from './package_tracking_reducer';

const rootReducer = combineReducers({
  currentUser: AuthReducer,
  filters: FiltersReducer,
  preventiveAlerts: PreventiveAlertsReducer,
  UI: UIReducer,
  carrierAllocation: CarrierAllocation,
  lanePerformance: LanePerformance,
  packageTracking: PackageTracking,
  data: DataReducer,
});

export default rootReducer;
