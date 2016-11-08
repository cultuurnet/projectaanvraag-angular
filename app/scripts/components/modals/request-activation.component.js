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
        .component('requestActivationComponent', {
            templateUrl: 'views/modals/request-activation.html',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: requestActivationController
        });

    /* @ngInject */
    function requestActivationController(projectaanvraagApiService, Messages) {

        /*jshint validthis: true */
        var ctrl = this;

        ctrl.project = ctrl.resolve.project;
        ctrl.formData = {};
        ctrl.showCoupon = false;
        ctrl.error = false;

        /**
         * Toggle the coupon status.
         */
        ctrl.toggleCoupon = function() {
            ctrl.showCoupon = !ctrl.showCoupon;
        }

        /**
         * Send the activation request.
         */
        ctrl.requestActivation = function () {

            if (!ctrl.showCoupon && ctrl.formData.coupon) {
                delete ctrl.formData.coupon;
            }

            // Request the activation.
            ctrl.error = false;
            Messages.clearMessages();
            projectaanvraagApiService.requestActivation(ctrl.project.id, ctrl.formData).then(function(project) {

                if (ctrl.formData.coupon) {
                    Messages.addMessage('success', 'Je project werd succesvol geactiveerd.');
                }
                else {
                    Messages.addMessage('success', 'Je aanvraag tot activatie werd succesvol verstuurd.');
                }

                ctrl.close({$value: project});

            }, function() {
                ctrl.error = true;
            })
        };
    }

})();