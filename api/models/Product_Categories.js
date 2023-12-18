/**
 * ProductCategory.js
 *
 * A model representing a product category in the application.
 */

module.exports = {

  attributes: {

    id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
      columnName: 'category_id',
    },

    categoryName: {
      type: 'string',
      maxLength: 255,
      columnName: 'category_name',
      required: true,
    },

    categoryDescription: {
      type: 'string',
      columnType: 'text',
      allowNull: true,
      columnName: 'category_description',
    },

    products: {
      collection: 'products',
      via: 'categoryId'
    }

  },
};
