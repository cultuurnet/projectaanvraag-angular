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
  function dashboardController(projectaanvraagApiService) {

      /*jshint validthis: true */
      var ctrl = this;

      ctrl.projects = [];

      /**
       * Load the projects
       */
      projectaanvraagApiService.getProjects().then(function(projects) {
          ctrl.projects = projects;
      });

  }

})();