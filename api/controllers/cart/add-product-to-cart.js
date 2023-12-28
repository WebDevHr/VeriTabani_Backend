/* eslint-disable camelcase */
// api/controllers/cart/add-product-to-cart.js

module.exports = {
  friendlyName: 'Add Product to Cart',
  description: 'Add a product to the user cart.',

  inputs: {
    productId: {
      description: 'The ID of the product to add to the cart.',
      type: 'number',
      required: true,
    }
  },

  exits: {
    success: {
      responseType: 'created',
    },
    error: {
      description: 'A server error occurred.',
      responseType: 'serverError',
    },
  },

  fn: async function ({ productId }) {
    const userId = this.req.user.id; // Assuming the user id is made available by the authentication middleware

    try {
      const userCart = await Cart.findOrCreate({ userId }, { userId });

      // Check if the product already exists in the cart
      const existingCartItem = await Cart_Items.findOne({
        cartId: userCart.id,
        productId,
      });

      let cartItem;

      if (existingCartItem) {
        // Product exists in the cart, so update its quantity
        cartItem = await Cart_Items.updateOne({ id: existingCartItem.id })
          .set({ quantity: existingCartItem.quantity + 1 });
      } else {
        // Product doesn't exist, so create a new cart item and set quantity to 1
        cartItem = await Cart_Items.create({
          cartId: userCart.id,
          productId,
          quantity: 1,
        }).fetch();
      }

      if (!cartItem) {
        throw 'error';
      }

      return cartItem;
    } catch (error) {
      sails.log.error('Failed to add product to cart:', error);
      throw 'serverError';
    }
  },
};
