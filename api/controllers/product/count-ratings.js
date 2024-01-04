// api/controllers/product/count-ratings.js

module.exports = {

  friendlyName: 'Count product ratings',

  description: 'Count the number of integer ratings for a product.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'The ID of the product to look up.'
    }
  },

  exits: {
    success: {
      description: 'Ratings count was successful.'
    },
    notFound: {
      responseType: 'notFound',
      description: 'No product with the specified ID was found in the database.'
    },
    error: {
      description: 'A server error occurred.'
    }
  },

  fn: async function ({ id }, exits) {
    try {
      const ratingCounts = await sails.models.reviews.getDatastore().sendNativeQuery(`
        SELECT rating, COUNT(*) as count
        FROM reviews
        WHERE product_id = $1
        GROUP BY rating
        ORDER BY rating ASC;
      `, [id]);

      let result = {};
      for (let i = 1; i <= 5; i++) {
        result[i] = 0;
      }

      if(id === 0) {
			  return exits.success(result);
		  }

      ratingCounts.rows.forEach((row) => {
        result[row.rating] = parseInt(row.count);
      });

      return exits.success(result);
    } catch (error) {
      sails.log.error('Error counting product ratings:', error);
      // Use `exits.error()` to return a 500 Server Error
      return exits.error({
        message: 'An error occurred while counting product ratings.',
        error: error.message
      });
    }
  }
};
