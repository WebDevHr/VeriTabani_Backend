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
    const userId = this.req.user.id;

    if (!userId) {
      userId = 0;
    }
    const productsQuery = 'SELECT * FROM get_product($1) WHERE product_id = $2';
    const productImagesQuery = 'SELECT image_id, image_url, alt_text FROM product_images WHERE product_id = $1';

    var product = await sails.models.products_view_model.getDatastore().sendNativeQuery(productsQuery, [userId ,id]);

    const images = await sails.models.product_images.getDatastore().sendNativeQuery(productImagesQuery, [id]);
    product.rows[0].images = images.rows;

    return {products: product.rows};

  }


};
