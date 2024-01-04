/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.


  // 'GET  /api/v1/testing':                 { action: 'testing' },
  // 'GET  /api/v1/products':                 { action: 'product/get-products' },
  // 'GET  /api/v1/product/:productId':                 { action: 'product/get-product' },
  // 'GET /categories/:id/products': 'product/categories.findProductsByCategory',
  // 'GET /categories': 'product/categories.allCategories',
  'GET /api/v1/account/log-in' : { action:'account/log-in'},
  'POST /api/v1/products/:perpage/:page' : { action:'product/get-all-products'},
  'POST /api/v1/product/:id' : { action:'product/get-product-by-id'},
  'POST /api/v1/add-product' : { action:'product/add-product'},
  'POST /api/v1/wishlist/toggle-favorite': { action:'wishlist/toggle-favorite' },
  'GET /api/v1/cart/get-cart-items': { action:'cart/get-cart-items' },
  'POST /api/v1/cart/add-product-to-cart': { action:'cart/add-product-to-cart' },
  'POST /api/v1/cart/remove-product-from-cart': { action:'cart/remove-product-from-cart' },
  'GET /api/v1/wishlist': { action: 'wishlist/get-wishlist' },
  'GET /api/v1/product/rating-details/:id': { action: 'product/count-ratings' },

  'POST /api/v1/register': { action: 'auth/register' },
  'POST /api/v1/login': { action: 'auth/login' },
  'PATCH /api/v1/change-password': { action: 'auth/change-password' },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
