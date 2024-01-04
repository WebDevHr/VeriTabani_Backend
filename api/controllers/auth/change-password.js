
module.exports = {
  friendlyName: 'Register',
  description: 'Register a new user.',

  inputs: {
    password: {
      type: 'string',
      required: true,
    },
	  newPassword: {
      type: 'string',
      required: true,
	  }
  },

  exits: {
    success: {
      description: 'New user account was created successfully.'
    },
    wrongPassword: {
      statusCode: 401,
      description: 'Wrong password',
    },
    serverError: {
      description: 'An error occurred during registration.',
      responseType: 'serverError',
    }
  },

  fn: async function ({ password, newPassword }, exits) {
    try {
      const userId = this.req.user.id; // Assuming the user id is made available by the authentication middleware

      // Prepare the raw SQL query
      const userInsertQuery = `Select * from users where user_id = $1;`;

      // Execute the raw query using data binding for security
      const result = await sails.sendNativeQuery(userInsertQuery, [userId]);

      const passwordCheck = await sails.helpers.checkPassword(password, result.rows[0].password_hash)
        .intercept('incorrect', 'badCombo');


      if(!passwordCheck) {
        return exits.wrongPassword({
          error: 'Şifre yanlış',
        });
      }

      const hashedNewPassword = await sails.helpers.hashPassword(newPassword).intercept('error', () => 'serverError');

      const newUserInsertQuery = `UPDATE users SET password_hash = $1 WHERE user_id = $2;`;

      await sails.sendNativeQuery(newUserInsertQuery, [ hashedNewPassword, userId ]);


      // // Get the newly created user
      // const newUser = result.rows[0];

      // // Remove passwordHash from the response using `_.omit` (assuming `lodash` is available)
      // const userWithoutPassword = _.omit(newUser, ['password_hash']);

      // // Sign a JWT token
      // const token = jwt.sign(
      //   { user: newUser.id },
      //   sails.config.custom.jwtSecret,
      //   { expiresIn: sails.config.custom.jwtExpires }
      // );

      // // All done.
      return exits.success({
        statusCode: 201,  // Set the status code to 'Created'
        description: 'Şifre güncellendi',
      });

    } catch (error) {
      sails.log.error(error);
      return exits.serverError(`An error occurred during change password.: ${error.message}`);
    }
  }
};
