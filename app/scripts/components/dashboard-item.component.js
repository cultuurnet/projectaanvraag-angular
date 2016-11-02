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
                onDelete: '&'
            }
        });

    /* @ngInject */
    function dashboardItemController(projectaanvraagApiService, ProjectStatuses, $uibModal, Messages) {

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

        ctrl.removeItem = function () {
            var confirmationModal = $uibModal.open({
                animation: true,
                component: 'confirmationComponent',
                resolve: {
                    title: function () {
                        return 'Project verwijderen';
                    },
                    message: function () {
                        return 'Ben je zeker dat je project definitief wil verwijderen? Je kan deze actie niet ongedaan maken.';
                    }
                }
            });

            confirmationModal.result.then(function() {
                Messages.clearMessages();

                // Delete the project
                projectaanvraagApiService.deleteProject(ctrl.project.id).then(function() {
                    projectaanvraagApiService.cache.projects = {};
                    ctrl.onDelete();
                    Messages.addMessage('success', 'Het project "'+ctrl.project.name+'" werd correct verwijderd.');
                }, function() {
                    Messages.addMessage('danger', 'Er ging iets mis. Probeer het later opnieuw.');
                });
            });
        };
    }

})();