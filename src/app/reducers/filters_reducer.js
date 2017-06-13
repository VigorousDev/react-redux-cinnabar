import { defaultFilters } from '../util/default_states';
import { merge } from 'lodash';

const FiltersReducer = (state = defaultFilters, action) => {
  switch (action.type) {
    case 'UPDATE_START_DATE': {
      const stateDup = merge({}, state);
      stateDup.start_date = action.startDate;
      return stateDup;
    }
    case 'UPDATE_END_DATE': {
      const stateDup = merge({}, state);
      stateDup.end_date = action.endDate;
      return stateDup;
    }
    case 'UPDATE_CATEGORY': {
      const stateDup = merge({}, state);
      stateDup.category = action.category;
      return stateDup;
    }
    case 'UPDATE_GROUPBY': {
      const stateDup = merge({}, state);
      stateDup.groupby = action.groupBy;
      return stateDup;
    }
    case 'UPDATE_GENDER': {
      const stateDup = merge({}, state);
      stateDup.user_gender = action.gender;
      return stateDup;
    }
    case 'UPDATE_CITY': {
      const stateDup = merge({}, state);
      stateDup.customer_city = action.city;
      return stateDup;
    }
    default:
      return state;
  }
};

export default FiltersReducer;
