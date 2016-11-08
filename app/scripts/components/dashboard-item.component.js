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
                onUpdate: '&'
            }
        });

    /* @ngInject */
    function dashboardItemController(projectaanvraagApiService, ProjectStatuses, $uibModal, Messages, uitidService) {

        /*jshint validthis: true */
        var ctrl = this;
        ctrl.fetching = true;
        ctrl.project = ctrl.data;
        ctrl.user = uitidService.user;

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
         * Is the current project blocked.
         * @return boolean
         */
        ctrl.isBlocked = function() {
            return ctrl.project.status.code === ProjectStatuses.BLOCKED.code;
        };

        /**
         * Is the current project inactive.
         * @return boolean
         */
        ctrl.isInactive = function() {
            return ctrl.project.status.code === ProjectStatuses.APPLICATION_SENT.code;
        };

        /**
         * The coupon used for the project, if any.
         * @return string
         */
        ctrl.couponUsed = function() {
            return ctrl.project.coupon;
        };

        /**
         * Remove the project.
         */
        ctrl.removeItem = function () {

            var modalInstance = $uibModal.open({
                animation: true,
                component: 'confirmationComponent',
                resolve: {
                    title: function () {
                        return 'Project verwijderen';
                    },
                    message: function () {
                        return 'Ben je zeker dat je project definitief wil verwijderen? Je kan deze actie niet ongedaan maken.';
                    },
                    confirm: function () {
                        return 'Verwijderen';
                    },
                    type: function () {
                        return 'danger';
                    }
                }
            });

            modalInstance.result.then(function() {
                Messages.clearMessages();
                // Delete the project
                projectaanvraagApiService.deleteProject(ctrl.project.id).then(function() {
                    projectaanvraagApiService.cache.projects = {};
                    ctrl.onUpdate();
                    Messages.addMessage('success', 'Het project "' + ctrl.project.name + '" werd correct verwijderd.');
                }, function() {
                    Messages.addMessage('danger', 'Er ging iets mis. Probeer het later opnieuw.');
                });
            });
        };

        /**
         * Open the modal to request the activation.
         */
        ctrl.requestActivation = function() {
            var modalInstance = $uibModal.open({
                component: 'requestActivationComponent',
                resolve: {
                    project: function () {
                        return ctrl.project;
                    }
                }
            });

            modalInstance.result.then(function (project) {
                ctrl.project = project;
            });
        };

        /**
         * Block the project.
         */
        ctrl.blockItem = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'confirmationComponent',
                resolve: {
                    title: function () {
                        return 'Project blokkeren';
                    },
                    message: function () {
                        return 'Ben je zeker dat je dit project wil blokkeren?';
                    },
                    confirm: function () {
                        return 'Blokkeren';
                    },
                    type: function () {
                        return 'danger';
                    }
                }
            });

            modalInstance.result.then(function() {
                Messages.clearMessages();

                // Delete the project
                projectaanvraagApiService.blockProject(ctrl.project.id).then(function(project) {
                    ctrl.project = project;
                    Messages.addMessage('success', 'Het project "' + ctrl.project.name + '" werd correct geblokkeerd.');
                }, function() {
                    Messages.addMessage('danger', 'Er ging iets mis. Probeer het later opnieuw.');
                });

            });
        };

        /**
         * Activate the project.
         */
        ctrl.activateItem = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'confirmationComponent',
                resolve: {
                    title: function () {
                        return 'Project live zetten';
                    },
                    message: function () {
                        return 'Ben je zeker dat je dit project wil live zetten?';
                    },
                    confirm: function () {
                        return 'Activeren';
                    }
                }
            });

            modalInstance.result.then(function() {
                Messages.clearMessages();

                // Delete the project
                projectaanvraagApiService.activateProject(ctrl.project.id).then(function(project) {
                    ctrl.project = project;
                    Messages.addMessage('success', 'Het project "' + ctrl.project.name + '" werd correct geactiveerd.');
                }, function() {
                    Messages.addMessage('danger', 'Er ging iets mis. Probeer het later opnieuw.');
                });

            });
        };

        /**
         * Update the content filter
         */
        ctrl.updateContentFilter = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'updateContentFilterComponent',
                resolve: {
                    project: function () {
                        return ctrl.project;
                    }
                }
            });

            modalInstance.result.then(function (project) {
                ctrl.project = project;
            });
        };
    }

})();