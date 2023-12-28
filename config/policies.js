/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  '*': true,
  'wishlist/toggle-favorite': 'isAuthenticated',
  'cart/get-cart-items': 'isAuthenticated',
  'cart/add-product-to-cart': 'isAuthenticated',
  'cart/remove-product-from-cart': 'isAuthenticated',
  'wishlist/get-wishlist': 'isAuthenticated'

  // man neveshtam ino
  // '*': 'isAuthenticated', // Apply to all routes - you can specify routes for more granularity
  // 'AuthController': {
  //   'register': true, // Allow public access to register
  //   'login': true, // Allow public access to login
  // }

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/


};
