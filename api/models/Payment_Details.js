// api/models/PaymentDetails.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'payment_id',
      autoIncrement: true,
      unique: true,
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
    orderId: {
      model: 'orders', // This should match the global identity of your Order model
      required: true,
      columnName: 'order_id',
    },
    amount: {
      type: 'number',
      columnType: 'decimal(10, 2)',
      columnName: 'amount',
      required: true
    },
    paymentDate: {
      type: 'ref',
      columnType: 'timestamp with time zone',
      columnName: 'payment_date',
      autoCreatedAt: true, // Automatically use the current date
    },
    paymentMethod: {
      type: 'string',
      columnName: 'payment_method',
      maxLength: 50,
      allowNull: true // Indicates that this column can be empty
    },
    status: {
      type: 'string',
      columnName: 'status',
      maxLength: 50,
      allowNull: true // Indicates that this column can be empty
    },
  },
};
