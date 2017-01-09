(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name projectaanvraagApp.component:requestActivationComponent
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
    function requestActivationController(projectaanvraagApiService, Messages, apiErrorCodes) {

        /*jshint validthis: true */
        var ctrl = this;

        ctrl.formData = {};
        ctrl.showCoupon = false;
        ctrl.error = '';
        ctrl.saving = false;

        /**
         * Initialize the controller.
         */
        ctrl.$onInit = function() {
            ctrl.project = ctrl.resolve.project;
        }

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
            ctrl.error = '';
            Messages.clearMessages();
            ctrl.saving = true;

            projectaanvraagApiService.requestActivation(ctrl.project.id, ctrl.formData).then(function(project) {

                if (ctrl.formData.coupon) {
                    Messages.addMessage('success', 'Je project werd succesvol geactiveerd.');
                }
                else {
                    Messages.addMessage('success', 'Je aanvraag tot activatie werd succesvol verstuurd.');
                }

                ctrl.saving = false;
                ctrl.close({$value: project});

            }, function(result) {

                ctrl.saving = false;

                // Show error label, if the code is known.
                if (result && apiErrorCodes[result.code]) {
                    ctrl.error = apiErrorCodes[result.code].label;
                }
                else {
                    ctrl.error = 'Er ging iets fout tijdens het versturen van de aanvraag.';
                }
            })
        };
    }

})();