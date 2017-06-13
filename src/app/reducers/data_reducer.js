import { merge } from 'lodash';

const DataReducer = (state = {}, action) => {
  const empty = {};
  empty[action.dataGroup] = {};
  switch (action.type) {
    case 'RECEIVE_DATA': {
      const stateDup = merge(empty, state);
      stateDup[action.dataGroup][action.dataName] = action.data;
      return stateDup;
    }
    case 'RECEIVE_BATCH_DATA': {
      const stateDup = merge(empty, state);
      for (let i = 0; i < action.dataNames.length; i++) {
        stateDup[action.dataGroup][action.dataNames[i]] = JSON.parse(action.data[i].body).data;
      }
      return stateDup;
    }
    case 'CLEAR_ALL_DATA': {
      return {};
    }
    case 'CLEAR_DATA_GROUP': {
      const stateDup = merge(empty, state);
      stateDup[action.dataGroup] = {};
      return stateDup;
    }
    case 'CLEAR_DATA_SET': {
      const stateDup = merge(empty, state);
      stateDup[action.dataGroup][action.dataSet] = undefined;
      return stateDup;
    }
    default:
      return state;
  }
};

export default DataReducer;
