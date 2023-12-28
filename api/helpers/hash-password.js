module.exports = {
  friendlyName: 'Hash password',
  description: 'Hashes a provided password using bcrypt.',

  inputs: {
    password: {
      type: 'string',
      required: true
    }
  },

  fn: async function (inputs, exits) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10; // or whatever number you wish to use for salting

    bcrypt.hash(inputs.password, saltRounds, (err, hash) => {
      if (err) {
        return exits.error(err);
      }
      return exits.success(hash);
    });
  }
};
