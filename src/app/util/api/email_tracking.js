export const emailsSentPre = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/pre_email_sent',
  filters,
});

export const confirmEmailsSent = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/confirm_email_sent',
  filters,
});

export const confirmEmailsOpened = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/confirm_email_open',
  filters,
});

export const emailsSentPost = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/post_email_sent',
  filters,
});

export const emailsOpenedPre = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/pre_email_open',
  filters,
});

export const emailsOpenedPost = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/post_email_open',
  filters,
});

export const emailLinksClickedChange = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/change_link',
  filters,
});

export const emailLinksClickedNoChange = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/nochange_link',
  filters,
});

export const orderChanged = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/order_change',
  filters,
});

export const totalEmailsSent = (filters) => ({
  method: 'GET',
  endpoint: '/email/view/total_emails',
  filters,
});


export const allEmailMetricsMismatch = () => {
  const filters = ['start_date', 'end_date', { email_type: 'mismatch' }];
  return {
    emailsSentPre: filters,
    emailsSentPost: filters,
    emailsOpenedPost: filters,
    emailsOpenedPre: filters,
    emailLinksClickedChange: filters,
    emailLinksClickedNoChange: filters,
    confirmEmailsSent: filters,
    confirmEmailsOpened: filters,
    orderChanged: filters,
  };
};

export const allEmailMetricsSplit = () => {
  const filters = ['start_date', 'end_date', { email_type: 'split_shipment' }];
  return {
    emailsSentPre: filters,
    emailsSentPost: filters,
    emailsOpenedPost: filters,
    emailsOpenedPre: filters,
    emailLinksClickedChange: filters,
    emailLinksClickedNoChange: filters,
    confirmEmailsSent: filters,
    confirmEmailsOpened: filters,
    orderChanged: filters,
  };
};

export const allEmailMetrics = () => {
  const filters = ['start_date', 'end_date'];
  return {
    emailsSentPre: filters,
    emailsSentPost: filters,
    emailsOpenedPost: filters,
    emailsOpenedPre: filters,
    emailLinksClickedChange: filters,
    emailLinksClickedNoChange: filters,
    confirmEmailsSent: filters,
    confirmEmailsOpened: filters,
    orderChanged: filters,
  };
};
