export const getLanes = (origin, destination, carrier, category) => ({
  type: 'GET_LANES',
  origin,
  destination,
  carrier,
  category,
});

export const receiveLanes = (lanes) => ({
  type: 'RECEIVE_LANES',
  lanes,
});

export const getLaneData = () => ({
  type: 'GET_LANE_DATA',
});

export const receiveLaneData = (laneData) => ({
  type: 'RECEIVE_LANE_DATA',
  laneData,
});
