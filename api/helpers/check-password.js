// api/helpers/check-password.js
const bcrypt = require('bcryptjs');
module.exports = {
  friendlyName: 'Check password',

  description: 'Compare a plaintext password attempt against the hashed password from the database',

  inputs: {
    plaintext: {
      type: 'string',
      required: true,
      description: 'The plaintext password attempt'
    },
    hashedPassword: {
      type: 'string',
      required: true,
      description: 'The hashed password from the database'
    }
  },

  fn: async function ({ plaintext, hashedPassword }) {
    // Use bcrypt or your chosen hashing lib to compare here, for example:
    return await bcrypt.compare(plaintext, hashedPassword);
  }
};
