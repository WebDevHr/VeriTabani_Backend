// api/models/Shipping.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'shipping_id',
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
      unique: true,
      columnName: 'order_id',
    },
    shippingType: {
      type: 'string',
      columnName: 'shipping_type',
      maxLength: 255,
      allowNull: true // Indicates that this column can be empty
    },
    address: {
      type: 'string',
      columnName: 'address',
      maxLength: 255,
      required: true
    },
    city: {
      type: 'string',
      columnName: 'city',
      maxLength: 255,
      required: true
    },
    postalCode: {
      type: 'string',
      columnName: 'postal_code',
      maxLength: 20,
      required: true
    },
    country: {
      type: 'string',
      columnName: 'country',
      maxLength: 255
    },
    cost: {
      type: 'number',
      columnType: 'decimal(10, 2)',
      columnName: 'cost',
      allowNull: true // Indicates that this column can be empty
    }
  },
};
