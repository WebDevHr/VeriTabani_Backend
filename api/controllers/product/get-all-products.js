module.exports = {


  friendlyName: 'Get all products',


  description: '',


  inputs: {
    page: {
      type: 'number',
      required: true
    },
    perpage: {
      type: 'number',
      required: true
    }

  },


  exits: {
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function ({page, perpage}) {

    // Calculate `offset`
    const offset = (page - 1) * perpage;

    // Check for invalid page number
    if(offset < 0) {
      return exits.badRequest({
        message: 'Invalid page number'
      });
    }

    const productsQuery = 'SELECT * FROM public.product_view ORDER BY product_id DESC LIMIT $1 OFFSET $2';

    var products = await sails.models.products_view_model.getDatastore().sendNativeQuery(productsQuery, [perpage, offset]);
    return {products: products.rows};
  }


};
