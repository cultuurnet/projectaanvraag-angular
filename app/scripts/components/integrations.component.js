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
  function integrationsController($location, $state) {

    /*jshint validthis: true */
    var ctrl = this;

    /**
     * Redirect to the add project page.
     */
    ctrl.redirectToAddProject = function() {
      $state.go('authenticated.addProject');
    };
  }

})();
