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
    function requestActivationController(projectaanvraagApiService, uitidService, Messages, apiErrorCodes) {

        /*jshint validthis: true */
        var ctrl = this;

        ctrl.formData = {};
        ctrl.formData.email = uitidService.user.mbox;
        ctrl.showCoupon = false;
        ctrl.error = '';
        ctrl.saving = false;
        ctrl.hasInsightlyProjectId = false

        /**
         * Initialize the controller.
         */
        ctrl.$onInit = function() {
            ctrl.project = ctrl.resolve.project;
            if(ctrl.project.insightlyProjectId) {
              ctrl.hasInsightlyProjectId = true;
            }
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
                    Messages.addMessage('success', 'Je aanvraag tot activatie werd succesvol verstuurd. Na goedkeuring ontvang je een bevestiging via e-mail en kan je verder met de configuratie en installatie.');
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
