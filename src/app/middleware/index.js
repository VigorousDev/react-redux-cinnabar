import { applyMiddleware } from 'redux';
import PreventiveAlertsMiddleware from './preventive_alerts_middleware';
import AuthMiddleware from './auth_middleware';
import DataMiddleware from './data_middleware';
import CarrierAllocation from './carrier_allocation_middleware';
import LanePerformance from './lane_performance_middleware';
import PackageTracking from './package_tracking_middleware';

const RootMiddleware = applyMiddleware(
  PreventiveAlertsMiddleware,
  AuthMiddleware,
  DataMiddleware,
  CarrierAllocation,
  LanePerformance,
  PackageTracking,
);

export default RootMiddleware;
