export const treeData = (data) => ({
  name: 'Total Emails Sent (A)',
  value: 20 + data.confirmEmailsSent[0].count + data.emailsSentPre[0].count,
  // value: 100,
  children: [
    {
      name: 'Confirmation Emails Sent (B)',
      parent: 'Items Purchased (A)',
      value: data.confirmEmailsSent[0].count,
      // value: 70,
      children: [
        {
          name: 'Confimration Emails Opened (C)',
          parent: 'Confirmation Emails Sent (B)',
          value: data.confirmEmailsOpened[0].count,
          // value: 30,
        },
        {
          name: 'Confirmation Emails Not Opened (N)',
          parent: 'Confirmation Emails Sent (B)',
          value: data.confirmEmailsSent[0].count - data.confirmEmailsOpened[0].count,
          // value: 40,
        },
      ],
    },
    {
      name: 'Order Change Emails Sent (D)',
      parent: 'Items Purchased (A)',
      value: 20 + data.emailsSentPre[0].count,
      // value: 30,
      children: [
        {
          name: 'Order Change Emails Opened (E)',
          parent: 'Order Change Emails Sent (D)',
          value: 20 + data.emailsOpenedPre[0].count,
          // value: 20,
          children: [
            {
              name: 'Not Clicked (F)',
              parent: 'Order Change Emails Opened (E)',
              value: data.emailsOpenedPre[0].count - (data.emailLinksClickedChange[0].count + data.emailLinksClickedNoChange[0].count),
              // value: 8,
            },
            {
              name: 'Click No Change Link (G)',
              parent: 'Order Change Emails Opened (E)',
              value: data.emailLinksClickedNoChange[0].count,
              //value: 12,
            },
            {
              name: 'Click Change Link (H)',
              parent: 'Order Change Emails Opened (E)',
              value: 20 + data.emailLinksClickedChange[0].count,
              // value: 10,
              children: [
                {
                  name: 'Change Made (I)',
                  parent: 'Click Change Link (H)',
                  value: data.orderChanged[0].count,
                  // value: 9,
                  children: [
                    {
                      name: 'Confirmation Email Opened (J)',
                      parent: 'Change Made (I)',
                      value: data.emailsOpenedPost[0].count,
                      // value: 1,
                    },
                    {
                      name: 'Confirmation Email Not Opened (K)',
                      parent: 'Change Made (I)',
                      value: data.orderChanged[0].count - data.emailsOpenedPost[0].count,
                      // value: 8,
                    },
                  ],
                },
                {
                  name: 'No Change Made (L)',
                  parent: 'Click Change Link (H)',
                  value: 20 + data.emailLinksClickedChange[0].count - data.orderChanged[0].count,
                  //value: 1,
                },
              ],
            },
          ],
        },
        {
          name: 'Order Change Emails Not Opened (M)',
          parent: 'Order Change Emails Sent (D)',
          value: data.emailsSentPre[0].count - data.emailsOpenedPre[0].count,
          // value: 10,
        },
      ],
    },
  ],
});
