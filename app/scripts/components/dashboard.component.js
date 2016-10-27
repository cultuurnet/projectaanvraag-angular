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
  function dashboardController(projectaanvraagApiService, $state) {

      /*jshint validthis: true */
      var ctrl = this;

      ctrl.loading = true;
      ctrl.projects = [];
      ctrl.nameFilter = '';
      ctrl.currentPage = 0;

      /**
       * Redirect to the create project page.
       */
      ctrl.redirectToCreate = function() {
        $state.go('addProject');
      };

      /**
       * Search projects.
       */
      ctrl.searchProjects = function() {
          projectaanvraagApiService.getProjects(ctrl.nameFilter, ctrl.currentPage).then(function(projects) {
              ctrl.projects = projects;
              ctrl.loading = false;
          }, function() {
              // @todo show message.
              ctrl.loading = false;
          });
      };

      // Start a search.
      ctrl.searchProjects();

  }

})();