(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name projectaanvraagApp.component:integrationsComponent
   * @description
   * # integrationsComponent
   * dashboard
   */
  angular
    .module('projectaanvraagApp')
    .component('integrationsComponent', {
      templateUrl: 'views/integrations.html',
      controller: integrationsController
    });

  /* @ngInject */
  function integrationsController($location, uitidService, $state) {

    /*jshint validthis: true */
    var ctrl = this;

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
