// api/models/Wishlist.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'wishlist_id',
      autoIncrement: true,
      unique: true,
    },
    userId: {
      model: 'users', // This should match the global identity of your User model
      required: true,
      columnName: 'user_id',
    },
    productId: {
      model: 'products', // This should match the global identity of your Product model
      required: true,
      columnName: 'product_id',
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
  },
};
