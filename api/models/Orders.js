// api/models/Orders.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true,
      columnName: 'order_id',
    },
    createdAt: {
      type: 'ref',
      columnType: 'timestamp with time zone',
      autoCreatedAt: true,
    },
    updatedAt: {
      type: 'ref',
      columnType: 'timestamp with time zone',
      autoUpdatedAt: true,
    },
    userId: {
      model: 'users', // This should be in lowercase, which is the typical convention for model identities in Sails.js
      required: true,
      columnName: 'user_id',
    },
    orderDate: {
      type: 'ref',
      columnType: 'timestamp with time zone',
      columnName: 'order_date',
      autoCreatedAt: true,
    },
    status: {
      type: 'string',
      isIn: ['Hazırlık aşamasında', 'Tamamlandı', 'Gönderildi', 'iptal edildi'],
      required: true
    },
    total: {
      type: 'number',
      columnType: 'float', // Adjust the columnType based on the precision you need, e.g., 'float', 'decimal', 'double', etc.
      columnName: 'total',
      required: true
    },

    orderDetails: {
      collection: 'order_details',
      via: 'orderId'
    },

    paymentDetails: {
      collection: 'payment_details',
      via: 'orderId'
    },

    shipping: {
      collection: 'shipping',
      via: 'orderId',
    },
    // Additional attributes can be defined here...
  },

};
