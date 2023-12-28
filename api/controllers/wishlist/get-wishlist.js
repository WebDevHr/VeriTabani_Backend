module.exports = {

  friendlyName: 'Find Favorites',

  description: 'Retrieve the list of favorite products for the logged-in user.',

  inputs: {
    // Define any inputs if necessary, for example, user filters or pagination
  },

  exits: {
    success: {
      description: 'Favorites successfully retrieved.',
    },
    notFound: {
      responseType: 'notFound',
      description: 'No favorites found for the user.',
    },
    forbidden: {
      responseType: 'forbidden',
      description: 'User not authorized to access others\' favorites',
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Replace with your authentication logic to get the user's ID
      const userId = this.req.user.id;

      if (!userId) {
        throw 'forbidden';
      }

      console.log(userId);

      // Access your datastore and make the necessary database calls
      // Assuming you have a model named `Favorites`
      var userFavorites = await Wishlist.find({ userId: userId })
        .populate('productId'); // Assuming the Favorite model has a 'product' association

      if (userFavorites.length === 0) {
        throw 'notFound';
      }

      // If successful, return the list of favorites via the 'success' exit
      return exits.success(userFavorites);

    } catch (err) {
      // If an error is thrown (e.g., "notFound"), forward it through the appropriate exit
      if (err === 'forbidden') {
        return exits.forbidden();
      } else if (err === 'notFound') {
        return exits.notFound();
      } else {
        // Forward unexpected errors through the default error exit
        return exits.error(err);
      }
    }
  }

};
