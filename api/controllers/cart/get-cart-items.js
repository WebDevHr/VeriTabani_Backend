// api/controllers/cart/get-cart-items.js


module.exports = {

  friendlyName: 'Get Cart Items',

  description: 'Retrieve all items in the user cart based on userId.',

  inputs: {
  },

  exits: {
    success: {
      responseType: 'ok',
    },
    notFound: {
      description: 'No cart found for the user.',
      responseType: 'notFound'
    }
  },

  fn: async function () {

    const userId = this.req.user.id;

    const cartQuerdy = 'SELECT c.cart_id, c.user_id, ci.cart_item_id, ci.product_id, ci.quantity FROM cart c LEFT JOIN cart_items ci ON c.cart_id = ci.cart_id WHERE c.user_id = $1;';

    let userCart = await sails.models.products_view_model.getDatastore().sendNativeQuery(cartQuerdy, [userId]);
    // let userCart = await Cart.findOne({ userId }).populate('items');

    if (!userCart) { throw 'notFound'; }
    // Additional step to populate Product details for each cart item

    for (let item of userCart.rows) {
      item.productId = await Products.findOne({ id: item.product_id }).populate('images');
    }

    return userCart.rows;
  }
};
