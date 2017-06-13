export const formatDate = (date) => {
  const d = new Date(date);
  let month = `${(d.getMonth() + 1)}`;
  let day = `${d.getDate()}`;
  const year = `${d.getFullYear()}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

export const formatDateLong = (date) => {
  const d = new Date(date);
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  const day = d.getDate();
  const monthIndex = d.getMonth();
  const year = d.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

export const getDays = (data) => {
  const parsed = [
    {
      count: 0,
      value: 'Sunday',
    },
    {
      count: 0,
      value: 'Monday',
    },
    {
      count: 0,
      value: 'Tuesday',
    },
    {
      count: 0,
      value: 'Wednesday',
    },
    {
      count: 0,
      value: 'Thursday',
    },
    {
      count: 0,
      value: 'Friday',
    },
    {
      count: 0,
      value: 'Saturday',
    },
  ];

  for (const key in data) {
    const day = new Date(data[key].value).getDay();
    parsed[day].count = parsed[day].count + data[key].count;
  }
  return parsed;
};

export const sortByHour = (data) => {
  const sorted = data.sort((a, b) => {
    if (parseInt(a.value, 10) > parseInt(b.value, 10)) {
      return 1;
    }
    if (parseInt(a.value, 10) < parseInt(b.value, 10)) {
      return -1;
    }
  });
  return sorted;
};

export const sortByWeekday = (data) => {
  const weekdays = {
    sun: 1,
    mon: 2,
    tue: 3,
    wed: 4,
    thu: 5,
    fri: 6,
    sat: 7,
  };
  return data.sort((a, b) => {
    if (weekdays[a.value] > weekdays[b.value]) {
      return 1;
    }
    if (weekdays[a.value] < weekdays[b.value]) {
      return -1;
    }
  })
};
