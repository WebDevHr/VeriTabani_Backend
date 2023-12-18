// api/models/Cart.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'cart_id',
      autoIncrement: true,
      unique: true,
    },
    // user_id is a foreign key that should reference a unique user
    userId: {
      model: 'users', // Ensure 'user' matches the model name for your Users table
      required: true,
      columnName: 'user_id',
    },

    items: {
      collection: 'cart_items', // This is the identity of the model for Cart_Items, ensure it matches
      via: 'cartId' // 'cart' is the attribute in CartItem model that creates the association
    },

  },
};
