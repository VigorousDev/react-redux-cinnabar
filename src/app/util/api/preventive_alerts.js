export const high = (filters) => ({
  method: 'GET',
  endpoint: '/returns/classes/data',
  filters,
});

export const medium = (filters) => ({
  method: 'GET',
  endpoint: '/returns/classes/data',
  filters,
});

export const low = (filters) => ({
  method: 'GET',
  endpoint: '/returns/classes/data',
  filters,
});

export const allPreventiveAlerts = () => ({
  high: ['start_date', 'end_date', { level: 'high' }],
  medium: ['start_date', 'end_date', { level: 'medium' }],
  low: ['start_date', 'end_date', { level: 'low' }],
});
