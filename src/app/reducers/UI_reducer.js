import { merge } from 'lodash';

const UIReducer = (state = { valueCount: 'value', treeData: 'all email types' }, action) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      const stateDup = merge({}, state);
      stateDup.sidebarOpen = true;
      return stateDup;
    }
    case 'CLOSE_SIDEBAR': {
      const stateDup = merge({}, state);
      stateDup.sidebarOpen = false;
      return stateDup;
    }
    case 'UPDATE_TREE_DATA': {
      const stateDup = merge({}, state);
      stateDup.treeData = action.value;
      return stateDup;
    }
    case 'TOGGLE_VALUE_COUNT': {
      const stateDup = merge({}, state);
      if (stateDup.valueCount === 'count') {
        stateDup.valueCount = 'value';
      } else {
        stateDup.valueCount = 'count';
      }
      return stateDup;
    }
    default:
      return state;
  }
};

export default UIReducer;
