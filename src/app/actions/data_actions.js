export const getData = (request, filters, dataGroup) => ({
  type: 'GET_DATA',
  request,
  filters,
  dataGroup,
});

export const getBatchData = (requests, dataGroup) => ({
  type: 'GET_BATCH_DATA',
  requests,
  dataGroup,
});

export const receiveData = (dataName, data, dataGroup) => ({
  type: 'RECEIVE_DATA',
  dataName,
  data,
  dataGroup,
});

export const receiveBatchData = (dataNames, data, dataGroup) => ({
  type: 'RECEIVE_BATCH_DATA',
  dataNames,
  data,
  dataGroup,
});

export const clearAllData = () => ({
  type: 'CLEAR_ALL_DATA',
});

export const clearDataGroup = (dataGroup) => ({
  type: 'CLEAR_DATA_GROUP',
  dataGroup,
});

export const clearDataSet = (dataGroup, dataSet) => ({
  type: 'CLEAR_DATA_SET',
  dataGroup,
  dataSet,
});
