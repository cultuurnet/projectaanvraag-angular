(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name projectaanvraagApp.component:dashboardItemComponent
     * @description
     * # loginComponent
     * dashboard
     */
    angular
        .module('projectaanvraagApp')
        .component('dashboardItemComponent', {
            templateUrl: 'views/dashboard-item.html',
            controller: dashboardItemController,
            bindings: {
                id: '=',
            }
        });

    /* @ngInject */
    function dashboardItemController(projectaanvraagApiService) {

        /*jshint validthis: true */
        var ctrl = this;
        ctrl.fetching = true;
        ctrl.project = null;

        /**
         * Load the project when controller is loaded.
         */
        projectaanvraagApiService.getProject(ctrl.id).then(function(project) {
            ctrl.project = project;
            ctrl.fetching = false;
        });

    }

})();