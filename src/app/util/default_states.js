const today = new Date();

export const defaultFilters = {
  end_date: today.toString(),
  start_date: new Date(today.setDate(today.getDate() - 180)).toString(),
  category: null,
  groupby: null,
  //user_gender: null,
};
