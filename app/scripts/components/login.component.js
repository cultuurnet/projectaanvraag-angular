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
  function loginController($location, $state, uitidService, projectaanvraagApiService) {

    /*jshint validthis: true */
    var ctrl = this;

    ctrl.integrationTypes = [];

    ctrl.integrationTypeDescription = {'output': 'Evenementinformatie ophalen van UiTdatabank', 'input': 'Evenementinformatie versturen naar UiTdatabank'};

    /**
    * Load the integration types and assign it to scope.
    */
    projectaanvraagApiService.getIntegrationTypes().then(function(integrationTypes) {
       ctrl.integrationTypes = integrationTypes;
    });

    /**
     * Redirect to the login screen.
     */
    ctrl.login = function() {
      var destination = $location.absUrl();

      // send the user to somewhere that makes sense when navigating from the login page
      if ($state.current.name === 'login') {
        destination = $state.href('authenticated.dashboard', {}, {absolute: true});
      }
      uitidService.login(destination, true);
    };
  }

})();
