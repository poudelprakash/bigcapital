
exports.seed = (knex) => {
  return knex('resource_fields').del()
    .then(() => {
      return knex('resource_fields').insert([
        // Accounts
        {
          id: 1,
          resource_id: 1,
          label_name: 'Account Name',
          key: 'name',
          data_type: 'textbox',
          predefined: 1,
          columnable: true,
        },
        {
          id: 2,
          resource_id: 1,
          label_name: 'Code',
          key: 'code',
          data_type: 'textbox',
          predefined: 1,
          columnable: true,
        },
        {
          id: 3,
          resource_id: 1,
          label_name: 'Type',
          key: 'type',
          data_type: 'options',
          predefined: 1,
          columnable: true,
          data_resource: 'accounts_types',
        },
        {
          id: 5,
          resource_id: 1,
          label_name: 'Description',
          data_type: 'textarea',
          key: 'description',
          predefined: 1,
          columnable: true,
        },
        {
          id: 6,
          resource_id: 1,
          label_name: 'Root type',
          data_type: 'textbox',
          key: 'root_type',
          predefined: 1,
          columnable: true,
        },
        {
          id: 16,
          resource_id: 1,
          label_name: 'Created at',
          data_type: 'date',
          key: 'created_at',
          predefined: 1,
          columnable: true,
        },
        {
          id: 17,
          resource_id: 1,
          data_type: 'boolean',
          label_name: 'Active',
          key: 'active',
          predefined: 1,
          columnable: true,
        },
        {
          id: 31,
          resource_id: 1,
          data_type: 'numeric',
          label_name: 'Balance',
          key: 'balance',
          predefined: 1,
          columnable: true,
        },
        {
          id: 32,
          resource_id: 1,
          data_type: 'options',
          label_name: 'Currency',
          key: 'currency',
          predefined: 1,
          columnable: true,
          data_resource: 'currencies',
        },
        {
          id: 33,
          resource_id: 1,
          data_type: 'options',
          label_name: 'Normal',
          key: 'normal',
          predefined: 1,
          columnable: true,
          options: JSON.stringify([
            { key: 'credit', label: 'Credit' },
            { key: 'debit', label: 'Debit' },
          ])
        },

        // Manual Journals
        {
          id: 18,
          resource_id: 4,
          data_type: 'date',
          label_name: 'Date',
          key: 'date',
          predefined: 1,
          columnable: true,
        },
        {
          id: 19,
          resource_id: 4,
          data_type: 'date',
          label_name: 'Created At',
          key: 'created_at',
          predefined: 1,
          columnable: true,
        },
        {
          id: 20,
          resource_id: 4,
          data_type: 'textbox',
          label_name: 'Journal Number',
          key: 'journal_number',
          predefined: 1,
          columnable: true,
        },
        {
          id: 21,
          resource_id: 4,
          data_type: 'boolean',
          label_name: 'Active',
          key: 'status',
          predefined: 1,
          columnable: true,
        },
        {
          id: 22,
          resource_id: 4,
          data_type: 'textbox',
          label_name: 'Reference',
          key: 'reference',
          predefined: 1,
          columnable: true,
        },
        {
          id: 23,
          resource_id: 4,
          data_type: 'textbox',
          label_name: 'Description',
          key: 'description',
          predefined: 1,
          columnable: true,
        },
        {
          id: 24,
          resource_id: 4,
          data_type: 'numeric',
          label_name: 'Amount',
          key: 'amount',
          predefined: 1,
          columnable: true,
        },
        {
          id: 25,
          resource_id: 4,
          data_type: 'optons',
          label_name: 'User',
          key: 'user',
          predefined: 1,
          columnable: true,
          data_resource: 'users',
        },
        {
          id: 26, 
          resource_id: 4,
          data_type: 'textbox',
          label_name: 'Journal Type',
          key: 'journal_type',
          predefined: 1,
          columnable: true,
        },

        // Expenses
        {
          id: 7,
          resource_id: 3,
          label_name: 'Payment Date',
          key: 'payment_date',
          data_type: 'date',
          predefined: 1,
          columnable: true, 
        },
        {
          id: 9,
          resource_id: 3,
          key: 'payment_account',
          label_name: 'Payment Account',
          data_type: 'options',
          predefined: 1,
          columnable: true,
          data_resource: 'accounts',
        },
        {
          id: 10,
          resource_id: 3,
          key: 'total_amount',
          label_name: 'Amount',
          data_type: 'numeric',
          predefined: 1,
          columnable: true,
        },
        {
          id: 27,
          resource_id: 3,
          label_name: 'Reference No.',
          key: 'reference_no',
          data_type: 'textbox',
          predefined: 1,
          columnable: true,
        },
        {
          id: 28,
          resource_id: 3,
          key: 'description',
          label_name: 'Description',
          data_type: 'textbox',
          predefined: 1,
          columnable: true,
        },
        {
          id: 29,
          resource_id: 3,
          key: 'published',
          label_name: 'Published',
          data_type: 'checkbox',
          predefined: 1,
          columnable: true,
        },
        {
          id: 30,
          resource_id: 3,
          key: 'user',
          data_type: 'options',
          label_name: 'User',
          predefined: 1,
          columnable: true,
          data_resource: 'users',
        },

        // Items
        {
          id: 11,
          resource_id: 2,
          label_name: 'Name',
          key: 'name',
          data_type: 'textbox',
          predefined: 1,
          columnable: true,
        },
        {   
          id: 12,
          resource_id: 2,
          label_name: 'Type',
          key: 'type',
          data_type: 'textbox',
          predefined: 1,
          columnable: true,
        },


        // Sales Estimates
        {
          label_name: 'Customer name',
          key: 'customer_name',
        },
        {
          label_name: 'Amount',
          key: 'amount',
        },
        {
          label_name: 'Estimate number',
          key: 'estimate_number',
        },
        {
          label_name: 'Estimate date',
          key: 'estimate_date',
        },
        {
          label_name: 'Expiration date',
          key: 'expiration_date',
        },
        {
          label_name: 'Reference',
          key: 'reference',
        },
        {
          label_name: 'Terms and conditions',
          key: 'terms_conditions',
        },
        {
          label_name: 'Note',
          key: 'note',
        },

        // Sales invoices
        // {
        //   label_name: 'Customer name',
        //   ley: 'customer_name',
        // },
        // {
        //   label_name: 'Amount',
        //   ley: 'amount',
        // },
        // {
        //   label_name: 'Invoice number',
        //   ley: 'invoice_no',
        // },
        // {
        //   label_name: 'Invoice date',
        //   ley: 'invoice_date',
        // },
        // {
        //   label_name: 'Reference',
        //   ley: 'reference',
        // },
        // {
        //   label_name: 'Payment amount',
        //   ley: 'payment_amount',
        // },
        // {
        //   label_name: 'Invoice message',
        //   ley: 'invoice_no',
        // },
        // {
        //   label_name: 'Terms and conditions',
        //   key: 'terms_conditions',
        // },

        // // Sales receipts
        // {
        //   label_name: 'Deposit account',
        //   key: 'deposit_account',
        // },
        // {
        //   label_name: 'Customer name',
        //   key: 'customer_name',
        // },
        // {
        //   label_name: 'Receipt date',
        //   key: 'receipt_date',
        // },
        // {
        //   label_name: 'Reference No',
        //   key: 'reference',
        // },
        // {
        //   label_name: 'Receipt message',
        //   key: 'receipt_message',
        // },
        // {
        //   label_name: 'Sent to email',
        //   key: 'email_send_to',
        // },

        // // Payment Receives
        // {
        //   label_name: 'Customer name',
        //   key: 'customer_name',
        // },
        // {
        //   label_name: 'Payment date',
        //   key: 'payment_date',
        // },
        // {
        //   label_name: 'Amount',
        //   key: 'amount',
        // },
        // {
        //   label_name: 'Reference No',
        //   key: 'reference',
        // },
        // {
        //   label_name: 'Deposit account',
        //   key: 'deposit_account',
        // },
        // {
        //   label_name: 'Payment receive no.',
        //   key: 'payment_receive_no',
        // },

        // // Purchases bills.
        // {
        //   label_name: 'Bill number',
        //   key: 'bill_number'
        // },

        // {
        //   label_name: 'Bill date',
        //   key: 'bill_date'
        // },
        // {
        //   label_name: 'Amount',
        //   key: 'amount'
        // },
        // {
        //   label_name: 'Vendor name',
        //   key: 'vendor_name'
        // },
        // {
        //   label_name: 'Due date',
        //   key: 'due_date'
        // },
        // {
        //   label_name: 'Note',
        //   key: 'note'
        // },
      ]);
    });
};
