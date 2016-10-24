(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name projectaanvraagApp.component:addProjectComponent
   * @description
   * # addProjectComponent*/
  angular
    .module('projectaanvraagApp')
    .component('addProjectComponent', {
      templateUrl: 'views/add_project.html',
      controller: addProjectController
    });

  /* @ngInject */
  function addProjectController($scope, $state, projectaanvraagApiService) {
    /*jshint validthis: true */
    var ctrl = this;

    ctrl.integrationTypes = [];
    ctrl.messages = [];

    /**
     * Load the integration types and assign it to scope.
     */
    projectaanvraagApiService.getIntegrationTypes().then(function(integrationTypes) {
      ctrl.integrationTypes = integrationTypes;
    });

    /**
     * Handle the form
     */
    $scope.formData = {};

    // process the form
    $scope.processForm = function() {
      projectaanvraagApiService.addProject($scope.formData).then(function(response) {
        if (response.messages) {
          ctrl.messages = response.messages;
        }

        if (response.type == 'success') {
          $state.go('dashboard');
        }
      });
    };

  }

})();