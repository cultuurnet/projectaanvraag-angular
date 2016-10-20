(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name projectaanvraagApp.component:loginComponent
   * @description
   * # loginComponent
   * dashboard
   */
  angular
    .module('projectaanvraagApp')
    .component('loginComponent', {
      templateUrl: 'views/login.html',
      controller: loginController
    });

  /* @ngInject */
  function loginController($location, $state, uitidService) {

    /*jshint validthis: true */
    var ctrl = this;

    /**
     * Redirect to the login screen.
     */
    ctrl.login = function() {
      var destination = $location.absUrl();

      // send the user to somewhere that makes sense when navigating from the login page
      if ($state.current.name === 'login') {
        destination = $state.href('dashboard', {}, {absolute: true});
      }
      uitidService.login(destination, true);
    };
  }

})();