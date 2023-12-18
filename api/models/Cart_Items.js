// api/models/CartItem.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'cart_item_id',
      autoIncrement: true,
      unique: true,
    },
    // cart_id is a foreign key that references an entry in the Cart table
    cartId: {
      model: 'cart', // Reflects the name of the Cart model in your Sails app
      required: true,
      columnName: 'cart_id',
    },
    // product_id is a foreign key that references an entry in the Products table
    productId: {
      model: 'products', // Reflects the name of the Product model in your Sails app
      required: true,
      columnName: 'product_id',
    },
    // quantity is a simple integer field, as per your table definition
    quantity: {
      type: 'number',
      columnName: 'quantity',
      required: true
    },
  },
};
