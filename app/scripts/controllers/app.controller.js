'use strict';

/**
 * @ngdoc function
 * @name projectaanvraagApp:AppController
 * @description
 */
angular
  .module('projectaanvraagApp')
  .controller('AppController', appController);

/* @ngInject */
function appController($transitions, $state, uitidService) {

  /*jshint validthis: true */
  var app = this;

  app.user = undefined;

  /**
   * Set the current user.
   */
  app.setUser = function (user) {
    app.user = user;
  };

  /**
   * Redirect to the login page.
   */
  app.redirectToLogin = function () {
    $state.go('login');
  };

  /**
   * Logs the user out.
   */
  app.logout = function() {
    uitidService.logout().then(app.redirectToLogin);
  };

  /**
   * Check if current state requires authentication.
   * Redirect to login if needed.
   */
  $transitions.onBefore({}, function(trans) {
    if (trans._targetState._definition.requireAuth) {
      uitidService.getUser()
        .then(app.setUser, function() {
          app.redirectToLogin();
        });
    }
  });
}