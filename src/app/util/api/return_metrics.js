export const returnsByReason = (filters) => ({
  method: 'GET',
  endpoint: '/returns/countdistinct/return_reason',
  filters,
});

export const returnsByLocation = (filters) => ({
  method: 'GET',
  endpoint: '/returns/countdistinct/return_location',
  filters,
});

export const returnsByCategory = (filters) => ({
  method: 'GET',
  endpoint: '/returns/countdistinct/return_category',
  filters,
});

export const returnsByInitiaionTime = (filters) => ({
  method: 'GET',
  endpoint: '/returns/count/return_initiation_time',
  filters,
});

export const totalOrders = (filters) => ({
  method: 'GET',
  endpoint: '/returns/count/orders',
  filters,
});

export const totalReturns = (filters) => ({
  method: 'GET',
  endpoint: '/returns/count/returns',
  filters,
});

export const returnsByPrice = (filters) => ({
  method: 'GET',
  endpoint: '/returns/ranges/price',
  filters,
});

export const returnsByCost = (filters) => ({
  method: 'GET',
  endpoint: '/returns/ranges/cost',
  filters,
});

export const returnsByRelativeCost = (filters) => ({
  method: 'GET',
  endpoint: '/returns/ranges/relative_return_cost',
  filters,
});

export const returnsByDate = (filters) => ({
  method: 'GET',
  endpoint: '/returns/count/return_date',
  filters,
});

export const ordersByDate = (filters) => ({
  method: 'GET',
  endpoint: '/returns/count/order_date',
  filters,
});

export const returnsByBrand = (filters) => ({
  method: 'GET',
  endpoint: '/returns/countdistinct/brand_names',
  filters,
});

export const returnsByWeekday = (filters) => ({
  method: 'GET',
  endpoint: '/returns/count/return_date',
  filters,
});

export const returnsByHour = (filters) => ({
  method: 'GET',
  endpoint: '/returns/count/return_date',
  filters,
});

export const returnsBySize = (filters) => ({
  method: 'GET',
  endpoint: '/returns/sizes',
  filters,
});

export const returnPercentChange = (filters) => ({
  method: 'GET',
  endpoint: '/changepercent/returns',
  filters,
});

export const orderPercentChange = (filters) => ({
  method: 'GET',
  endpoint: '/changepercent/orders',
  filters,
});

export const returnPercentByPurchaseQuantity = (filters) => ({
  method: 'GET',
  endpoint: '/returns/count/purchase_qty',
  filters,
});

export const returnPercentByCity = (filters) => ({
  method: 'GET',
  endpoint: '/returns/percentage/return_location',
  filters,
});

export const returnValueByDate = (filters) => ({
  method: 'GET',
  endpoint: '/returns/value/return_date',
  filters,
});

export const orderValueByDate = (filters) => ({
  method: 'GET',
  endpoint: '/returns/value/order_date',
  filters,
});

export const totalOrderValue = (filters) => ({
  method: 'GET',
  endpoint: '/returns/value/orders',
  filters,
});

export const totalReturnValue = (filters) => ({
  method: 'GET',
  endpoint: '/returns/value/returns',
  filters,
});

export const returnValueTrends = (filters) => ({
  method: 'GET',
  endpoint: '/changevaluepercent/returns',
  filters,
});

export const orderValueTrends = (filters) => ({
  method: 'GET',
  endpoint: '/changevaluepercent/orders',
  filters,
});

export const returnValuePrevented = (filters) => ({
  method: 'GET',
  endpoint: '/returns/prevent',
  filters,
});

export const allReturnMetrics = () => {
  const filters = ['start_date', 'end_date', 'category'];
  return {
    returnsByReason: filters,
    returnsByLocation: filters,
    returnsByCategory: ['start_date', 'end_date'],
    returnsByInitiaionTime: filters,
    totalOrders: filters,
    totalReturns: filters,
    returnsByPrice: filters,
    returnsByCost: filters,
    returnsByRelativeCost: filters,
    returnsByDate: filters,
    ordersByDate: filters,
    returnsByBrand: filters,
    returnsByWeekday: ['start_date', 'end_date', 'category', { groupby: 'weekday' }],
    //returnsByHour: ['start_date', 'end_date', 'category', { groupby: 'hour' }],
    returnsBySize: ['start_date', 'end_date', 'category', 'user_gender'],
    returnPercentChange: filters,
    orderPercentChange: filters,
    returnPercentByPurchaseQuantity: filters,
    returnPercentByCity: filters,
    returnValueByDate: filters,
    orderValueByDate: filters,
    totalOrderValue: filters,
    totalReturnValue: filters,
    returnValueTrends: filters,
    orderValueTrends: filters,
    returnValuePrevented: filters,
  };
};
