module.exports = {
  tableName: 'product_view',
  attributes: {
    productId: { type: 'number', autoIncrement: true, columnName: 'product_id',},
    name: { type: 'string' , columnName: 'name',},
    category: { type: 'string', columnName: 'category' },
    description: { type: 'string', columnName: 'description' },
    price: { type: 'number', columnName: 'price' },
    averageRating: { type: 'number', columnName: 'average_rating' },
    numberOfRatings: { type: 'number', columnName: 'number_of_ratings' },
    imageUrl: { type: 'string', columnName: 'image_url' },
    altText: { type: 'string', columnName: 'alt_text' }
  },

  primaryKey: 'id', // OR whatever your primary key is
  migrate: 'safe'  // This tells sails not to perform migrations on this model
};
