/**
 * Product.js
 *
 * A model representing a product in the application.
 */

module.exports = {

  attributes: {

    id: {
      type: 'number',
      autoIncrement: true,
      required: true,
      unique: true,
      columnName: 'product_id',
    },

    name: {
      type: 'string',
      required: true,
      maxLength: 255,
    },

    description: {
      type: 'string',
      columnType: 'text',
      allowNull: true,
    },

    price: {
      type: 'string', // Change the type to 'string'
      required: true,
      columnType: 'decimal(10,2)',
    },

    quantityInStock: {
      type: 'number',
      defaultsTo: 0,
      columnName: 'quantity_in_stock',
    },

    images: {
      collection: 'product_images',
      via: 'productId'
    },

    // Reference to ProductCategory model
    categoryId: {
      model: 'Product_Categories',
      columnName: 'category_id',
    },

    reviews: {
      collection: 'reviews',
      via: 'productId' // The field in the Review model that points back here
    },

    wishlistedBy: {
      collection: 'wishlist',
      via: 'productId' // The field in the Wishlist model that points back to the product
    },

    inventory: {
      collection: 'inventory',
      via: 'productId'
    },

    cartItems: {
      collection: 'Cart_Items',
      via: 'productId'
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
