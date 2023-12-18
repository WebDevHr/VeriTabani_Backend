// api/models/OrderDetails.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'order_detail_id',
      autoIncrement: true,
      unique: true,
    },
    // Foreign key to Orders table
    orderId: {
      model: 'orders', // Make sure 'order' matches the model name for your Orders table
      required: true,
      columnName: 'order_id',
    },
    // Foreign key to Products table
    productId: {
      model: 'products', // Make sure 'product' matches the model name for your Products table
      required: true,
      columnName: 'product_id',
    },
    quantity: {
      type: 'number',
      columnName: 'quantity',
      required: true
    },
    priceAtTimeOfPurchase: {
      type: 'number',
      columnType: 'decimal(10,2)',
      columnName: 'price_at_time_of_purchase',
      required: true
    },
  },

};
