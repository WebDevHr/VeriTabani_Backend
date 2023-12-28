const jwt = require('jsonwebtoken');
module.exports = {
  friendlyName: 'Login',
  description: 'Login a user and issue a JSON Web Token (JWT)',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      maxLength: 200,
    },
  },

  exits: {
    success: {
      responseType: 'ok',
      description: 'User logged in successfully',
    },
    notFound: {
      responseType: 'notFound',
      description: 'No user with the specified email found in the database.',
    },
    badCombo: {
      responseType: 'unauthorized',
      description: 'The provided email and password combination does not match any user in the database.',
    },
    serverError: {
      statusCode: 500,
      description: 'The server encountered an unexpected condition.',
    },
  },

  fn: async function ({ email, password }, exits) {
    try {
      // Check if the user exists
      const userRecord = await Users.findOne({ email });
      if (!userRecord) {
        return exits.notFound({
          error: 'No user with the specified email was found in the database.',
        });
      }

      // Use a helper to hash the provided password and compare it with the
      // user record's hashed password.
      await sails.helpers.checkPassword(password, userRecord.passwordHash)
        .intercept('incorrect', 'badCombo');

      // Issue a JWT token using the `sign` method from `jsonwebtoken`
      const token = jwt.sign(
        { user: userRecord.id },
        sails.config.custom.jwtSecret,
        { expiresIn: sails.config.custom.jwtExpires }
      );

      return exits.success({
        message: 'Successful login.',
        user: _.omit(userRecord, ['passwordHash']),
        token: token
      });

    } catch (error) {
      // Log the error server-side
      sails.log.error('Failed login attempt', { email, error });
      return exits.serverError({
        message: 'An error occurred during the login process.',
      });
    }
  }
};
