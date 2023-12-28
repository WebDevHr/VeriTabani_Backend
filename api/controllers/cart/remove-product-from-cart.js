/* eslint-disable camelcase */
// api/controllers/cart/remove-product-from-cart.js

module.exports = {
  friendlyName: 'Remove Product from Cart',
  description: 'Remove a product or decrease quantity from the user cart.',

  inputs: {
    productId: {
      description: 'The ID of the product to remove from the cart or decrement quantity.',
      type: 'number',
      required: true,
    },
  },

  exits: {
    notFound: {
      description: 'No cart item found with the specified ID.',
      responseType: 'notFound',
    },
    success: {
      description: 'The quantity was decremented or product was removed from the cart successfully.',
      responseType: 'ok',
    },
    error: {
      description: 'A server error occurred.',
      responseType: 'serverError',
    },
  },

  fn: async function ({ productId }) {
    const userId = this.req.user.id; // Assuming user is authenticated and `req.user.id` is set.

    try {
      // Find the user's cart
      const userCart = await Cart.findOne({ userId });

      if (!userCart) {
        throw 'notFound';
      }

      // Find the cart item
      const cartItem = await Cart_Items.findOne({
        cartId: userCart.id,
        productId
      });

      if (!cartItem) {
        throw 'notFound';
      }

      // Check quantity and remove or decrement
      if (cartItem.quantity === 1) {
        // If only one item is left, delete the cart item
        await Cart_Items.destroyOne({ id: cartItem.id });
      } else {
        // Decrement the quantity by 1
        await Cart_Items.updateOne({ id: cartItem.id }).set({ quantity: cartItem.quantity - 1 });
      }

      return;
    } catch (err) {
      if (typeof err === 'string') {
        throw err;
      } else {
        sails.log.error('Failed to remove product from cart:', err);
        throw 'serverError';
      }
    }
  },
};
