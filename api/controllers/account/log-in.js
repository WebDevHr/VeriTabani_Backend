module.exports = {


  friendlyName: 'Log in',


  description: '',


  inputs: {
    email: {
      description: 'User Email to log in',
      type: 'string',
      required: true,
    },
    password: {
      description: 'User passwordd to log in',
      type: 'string',
      required: true,
    },
    keepMeLogin: {
      description: 'User will decide to stay logged in if he close the window',
      type: 'boolean',
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    console.log(inputs.email);
    // All done.
    return;

  }


};
