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
                data: '=',
            }
        });

    /* @ngInject */
    function dashboardItemController(projectaanvraagApiService, ProjectStatuses) {

        /*jshint validthis: true */
        var ctrl = this;
        ctrl.fetching = true;
        ctrl.project = ctrl.data;

        /**
         * Load the project when controller is loaded.
         */
        projectaanvraagApiService.getProject(ctrl.project.id).then(function(project) {
            ctrl.project = project;
            ctrl.fetching = false;
        }, function() {
            ctrl.fetching = false;
        });

        /**
         * Is the current project live.
         * @return boolean
         */
        ctrl.isLive = function() {
            return ctrl.project.status.code === ProjectStatuses.ACTIVE.code;
        };

        /**
         * Is the current project inactive.
         * @return boolean
         */
        ctrl.isInactive = function() {
            return ctrl.project.status.code === ProjectStatuses.APPLICATION_SENT.code;
        };
    }

})();