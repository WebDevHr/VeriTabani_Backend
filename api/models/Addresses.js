// api/models/Address.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'address_id',
      autoIncrement: true,
      unique: true,
    },
    userId: {
      model: 'users', // This should match the identity of your User model
      required: true, // Assuming a user must be associated with the address
      columnName: 'user_id',
    },
    addressLine1: {
      type: 'string',
      maxLength: 255,
      columnName: 'address_line1',
      required: true
    },
    addressLine2: {
      type: 'string',
      maxLength: 255,
      columnName: 'address_line2',
      allowNull: true // Optional field
    },
    city: {
      type: 'string',
      maxLength: 255,
      columnName: 'city',
      required: true
    },
    state: {
      type: 'string',
      maxLength: 255,
      columnName: 'state',
      allowNull: true // Optional field
    },
    postalCode: {
      type: 'string',
      maxLength: 20,
      columnName: 'postal_code',
      required: true
    },
    country: {
      type: 'string',
      maxLength: 255,
      columnName: 'country',
      required: true
    },
    addressType: {
      type: 'string',
      maxLength: 50,
      columnName: 'address_type',
      allowNull: true // Optional field
    },

    vendorId: {
      collection: 'vendors', // This should match the identity of your Vendor model
      via: 'addressId', // If an address is uniquely associated with a single vendor
    },

  },
};
