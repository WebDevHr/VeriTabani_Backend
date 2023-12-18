module.exports = {
  friendlyName: 'Add product',
  description: '',
  inputs: {
    name: {
      type: 'string',
      required: true,
      description: 'The name of the product'
    },
    description: {
      type: 'string',
      required: true,
      description: 'The description of the product'
    },
    price: {
      type: 'number',
      required: true,
      description: 'The price of the product'
    },
    quantityInStock: {
      type: 'number',
      required: true,
      description: 'How many items of the product are in stock'
    },
    categoryId: {
      type: 'number',
      required: true,
      description: 'The category ID of the product'
    },
  },
  exits: {},
  fn: async function (inputs) {

    var response = await sails.models.products.getDatastore().sendNativeQuery(
      'INSERT INTO Products (name, description, price, quantity_in_stock, category_id) VALUES ($1, $2, $3, $4, $5);',
      [inputs.name, inputs.description, inputs.price, inputs.quantityInStock, inputs.categoryId]
    );

    return {resp: response};
  }
};
