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
  function addProjectController($scope, $state, projectaanvraagApiService, Messages) {
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
    $scope.processForm = function($isValid) {
      Messages.clearMessages();

      if ($isValid) {
        projectaanvraagApiService.addProject($scope.formData).then(function(response) {
          Messages.addMessage('success', 'hooray');
        }, function(reason) {
          Messages.addMessage('danger', 'Er ging iets mis. Probeer het later opnieuw.');
        });
      }else {
        Messages.addMessage('danger', 'Gelieve de verplichte velden in te vullen.');
      }

    };

  }

})();