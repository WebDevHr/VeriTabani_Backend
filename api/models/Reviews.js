// api/models/Review.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'review_id',
      autoIncrement: true,
      unique: true,
    },
    productId: {
      model: 'products', // This should match the identity of your Product model
      required: true,
      columnName: 'product_id',
    },
    userId: {
      model: 'users', // This should match the identity of your User model
      required: true,
      columnName: 'user_id',
    },
    rating: {
      type: 'number',
      columnType: 'integer',
      min: 1,
      max: 5,
      required: true
    },
    title: {
      type: 'string',
      maxLength: 255,
      columnName: 'title',
    },
    body: {
      type: 'string',
      columnType: 'text',
      columnName: 'body',
    },
  },

};
