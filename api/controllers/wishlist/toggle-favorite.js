// api/controllers/wishlist/toggle-favorite.js
module.exports = {
  friendlyName: 'Toggle Favorite',

  description: 'Toggle a product as favorite in the user\'s wishlist.',

  inputs: {
    productId: {
      type: 'number',
      required: true
    }
  },

  exits: {
    success: {
      responseType: 'ok'
    },
    notFound: {
      description: 'No product with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ productId }, exits) {
    // Get the user ID from the decoded JWT (assumes req.user is available)
    const userId = this.req.user.id;

    try {
      // Check if the product is already in the wishlist
      const existingEntry = await Wishlist.findOne({ userId, productId });

      if (existingEntry) {
        // Product is already in wishlist, so remove it
        await Wishlist.destroyOne({ id: existingEntry.id });
        return exits.success({ isFavorite: false });
      } else {
        // Product is not in wishlist, so add it
        await Wishlist.create({ userId, productId });
        return exits.success({ isFavorite: true });
      }
    } catch (err) {
      // Handle unexpected errors
      exits.error(err);
    }
  }
};
