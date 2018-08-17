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
  function addProjectController($state, projectaanvraagApiService, Messages, apiErrorCodes, $location, $anchorScroll) {
    /*jshint validthis: true */
    var ctrl = this;

    ctrl.integrationTypes = [];
    ctrl.useCoupon = false;
    ctrl.saving = false;
    ctrl.formData = {};

    /**
     * Load the integration types and assign it to scope.
     */
    projectaanvraagApiService.getIntegrationTypes().then(function(integrationTypes) {
      ctrl.integrationTypes = integrationTypes;
    });

    /**
     * Handle the form
     */
    ctrl.processForm = function($isValid) {

      // Clear all previously set messages
      Messages.clearMessages();

      if ($isValid) {

        if (!ctrl.useCoupon && ctrl.formData.coupon) {
          delete ctrl.formData.coupon;
        }

        ctrl.formData.integrationType = ctrl.formData.integration.id;

        ctrl.saving = true;

        projectaanvraagApiService.addProject(ctrl.formData).then(function() {
          // Show success message and redirect to the dashboard
          Messages.addMessage('success', 'Je project is aangemaakt. Je vindt het hieronder in de lijst terug.');
          ctrl.saving = false;
          $state.go('authenticated.dashboard');
        }, function(result) {

          // Show error label, if the code is known.
          if (result && apiErrorCodes[result.code]) {
            Messages.addMessage('danger', apiErrorCodes[result.code].label);
          }
          else {
            Messages.addMessage('danger', 'Er ging iets mis. Probeer het later opnieuw.');
          }

          $location.hash('messages');
          $anchorScroll();

          ctrl.saving = false;

        });
      } else {
        Messages.addMessage('danger', 'Gelieve de verplichte velden in te vullen.');
      }

    };

    /**
     * Redirect to the dashboard page.
     */
    ctrl.redirectToDashboard = function() {
      $state.go('authenticated.dashboard');
    };

  }

})();
