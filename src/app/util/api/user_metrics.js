export const returnsByUserCount = (filters) => ({
  method: 'GET',
  endpoint: '/returns/countdistinct/user_returns',
  filters,
});

export const ordersByUserCount = (filters) => ({
  method: 'GET',
  endpoint: '/returns/countdistinct/user_orders',
  filters,
});

export const returnPercentByUserCount = (filters) => ({
  method: 'GET',
  endpoint: '/returns/ranges/user_order_return_percent',
  filters,
});

export const allUserMetrics = () => {
  const filters = ['start_date', 'end_date', 'category'];
  return {
    returnsByUserCount: filters,
    ordersByUserCount: filters,
    returnPercentByUserCount: filters,
  };
};
