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
    },
    userid: {
      type: 'number',
      default: 0,
    }

  },


  exits: {
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function ({page, perpage, userid}) {

    // Calculate `offset`
    const offset = (page - 1) * perpage;

    // Check for invalid page number
    if(offset < 0) {
      return exits.badRequest({
        message: 'Invalid page number'
      });
    }
    const productsQuery = 'SELECT * FROM get_product($1) ORDER BY product_id DESC LIMIT $2 OFFSET $3';

    var products = await sails.models.products_view_model.getDatastore().sendNativeQuery(productsQuery, [userid ,perpage, offset]);
    return {products: products.rows};
  }


};
