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
    .component('dashboardComponent', {
      templateUrl: 'views/dashboard.html',
      controller: dashboardController
    });

  /* @ngInject */
  function dashboardController(projectaanvraagApiService, $state, Messages) {

      /*jshint validthis: true */
      var ctrl = this;

      ctrl.loading = true;
      ctrl.projects = [];
      ctrl.nameFilter = '';
      ctrl.currentPage = 1;
      ctrl.totalProjects = 0;
      ctrl.itemsPerPage = 20;

      /**
       * Redirect to the create project page.
       */
      ctrl.redirectToCreate = function() {
        $state.go('authenticated.addProject');
      };

      /**
       * Search projects.
       */
      ctrl.searchProjects = function() {
          projectaanvraagApiService.getProjects(ctrl.nameFilter, ctrl.currentPage, ctrl.itemsPerPage).then(function(result) {
              ctrl.projects = result.projects;
              ctrl.totalProjects = result.total;
              ctrl.loading = false;
          }, function() {
              Messages.clearMessages();
              Messages.addMessage('danger', 'Er ging iets fout bij het laden van je projecten. Probeer het later opnieuw.');
              ctrl.loading = false;
          });
      };

      // Start a search.
      ctrl.searchProjects();

  }

})();