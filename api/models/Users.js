/**
 * User.js
 *
 * Model representing the Users table in the application.
 */

module.exports = {
  attributes: {
    id: {
      type: 'number', // type is still number, as user_id is an auto incrementing integer
      autoIncrement: true,
      columnName: 'user_id',
      unique: true
    },
    firstName: {
      type: 'string',
      required: true,
      columnName: 'first_name',
      maxLength: 255
    },
    lastName: {
      type: 'string',
      required: true,
      columnName: 'last_name',
      maxLength: 255
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      columnName: 'email',
      isEmail: true,
      maxLength: 255
    },
    passwordHash: {
      type: 'string',
      required: true,
      columnName: 'password_hash',
      protect: true  // This will prevent the password hash from being returned in queries
    },
    phoneNumber: {
      type: 'string',
      allowNull: true,
      columnName: 'phone_number',
      maxLength: 50
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true,
      columnName: 'is_active'
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'is_admin'
    },
    orders: {
      collection: 'orders', // This should match the identity of your Orders model, usually in lowercase.
      via: 'userId' // This matches the attribute in the Orders model that makes the association.
    },

    reviews: {
      collection: 'reviews',
      via: 'userId' // The field in the Review model that points back here
    },

    addresses: {
      collection: 'addresses',
      via: 'userId'  // Field in the Address model pointing back to the User
    },

    wishlists: {
      collection: 'wishlist',
      via: 'userId' // The field in the Wishlist model that points back to the user
    },

    cart: {
      collection: 'Cart',
      via: 'userId'
    }

  },


  // Custom configuration for data serialization
  customToJSON: function() {
    // Return a shallow copy of this record with the password and any other sensitive info omitted.
    return _.omit(this, ['passwordHash']);
  },
};
