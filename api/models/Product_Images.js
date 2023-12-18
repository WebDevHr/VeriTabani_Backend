// api/models/ProductImages.js
module.exports = {
  attributes: {
    // Sails/Waterline automatically handles the primary key as `id`
    id: {
      type: 'number',
      columnName: 'image_id',
      autoIncrement: true,
      unique: true
    },
    productId: {
      // Establishes a reference to the `Products` model's primary key
      model: 'Products', // This should match the identity of the products model (usually lowercase)
      columnName: 'product_id',
    },
    imageUrl: {
      type: 'string',
      required: true,
      columnName: 'image_url',
      maxLength: 255
    },
    altText: {
      type: 'string',
      allowNull: true, // Allows storing null values
      columnName: 'alt_text',
      maxLength: 255
    }
  },

};
