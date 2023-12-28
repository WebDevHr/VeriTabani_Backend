const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = {
  friendlyName: 'Register',
  description: 'Register a new user.',

  inputs: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    phoneNumber: {
      type: 'string',
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'New user account was created successfully.'
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
    serverError: {
      description: 'An error occurred during registration.',
      responseType: 'serverError',
    }
  },

  fn: async function ({ firstName, lastName, email, password, phoneNumber }, exits) {
    try {
      // Hash the password before saving
      const hashedPassword = await sails.helpers.hashPassword(password).intercept('error', () => 'serverError');
      // Prepare the raw SQL query
      const rawInsertQuery = `
        INSERT INTO users (first_name, last_name, email, phone_number, password_hash, is_active, is_admin)
        VALUES ($1, $2, $3, $4, $5, true, false)
        RETURNING *;
      `;

      // Execute the raw query using data binding for security
      const result = await sails.sendNativeQuery(rawInsertQuery, [firstName, lastName, email, phoneNumber, hashedPassword]);

      // Get the newly created user
      const newUser = result.rows[0];

      // Remove passwordHash from the response using `_.omit` (assuming `lodash` is available)
      const userWithoutPassword = _.omit(newUser, ['password_hash']);

      // Sign a JWT token
      const token = jwt.sign(
        { user: newUser.id },
        sails.config.custom.jwtSecret,
        { expiresIn: sails.config.custom.jwtExpires }
      );

      // All done.
      return exits.success({
        statusCode: 201,  // Set the status code to 'Created'
        description: 'New user account was created successfully.',
        user: userWithoutPassword,
        token: token
      });

    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse(`Email ${email} is already in use.`);
      }

      sails.log.error(error);
      return exits.serverError(`An error occurred during registration: ${error.message}`);
    }
  }
};
