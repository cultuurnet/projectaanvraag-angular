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
function appController($transitions, $state, uitidService, Messages) {

  /*jshint validthis: true */
  var app = this;

  app.Messages = Messages;
  app.uitidService = uitidService;

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
  $transitions.onError({to: 'authenticated.*'}, function() {
    app.redirectToLogin();
  });
}