module.exports = {


  friendlyName: 'Get product by id',


  description: '',


  inputs: {
    id: {
      type: 'number',
      required: true
    }

  },


  exits: {

  },


  fn: async function ({id}) {

    const productByIdQuery = 'SELECT * FROM public.products WHERE product_id = $1';

    var products = await sails.models.products.getDatastore().sendNativeQuery(productByIdQuery, [id]);
    return {products: products.rows};

  }


};
