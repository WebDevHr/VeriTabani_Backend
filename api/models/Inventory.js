// api/models/Inventory.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'inventory_id',
      autoIncrement: true,
      unique: true,
    },
    // Foreign key to the Products table
    productId: {
      model: 'products', // Ensure 'product' matches the model name for your Products table
      required: true,
      columnName: 'product_id',
    },
    quantityAvailable: {
      type: 'number',
      defaultsTo: 0,
      columnName: 'quantity_available',
    },
    lastRestock: {
      type: 'ref',
      columnType: 'timestamp with time zone',
      columnName: 'last_restock',
    },
  },

};
