(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name projectaanvraagApp.component:billingInformationComponent
     * @description
     * # billingInformationComponent
     */
    angular
        .module('projectaanvraagApp')
        .component('billingInformationComponent', {
            templateUrl: 'views/modals/billing-information.html',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: billingInformationController
        });

    /* @ngInject */
    function billingInformationController(projectaanvraagApiService, appConfig, Messages) {
        /*jshint validthis: true */
        var ctrl = this;

        ctrl.loading = true;

        ctrl.project = ctrl.resolve.project;
        ctrl.formData = {};
        ctrl.error = false;
        ctrl.apiError = false;
        ctrl.organisation = {};

        /**
         * Loads the linked organisation if any.
         */
        ctrl.loadOrganisation = function () {
            projectaanvraagApiService.getOrganisationByProject(ctrl.project.id).then(function(organisation) {
                ctrl.organisation = organisation;
                ctrl.formData.name = organisation.name || '';

                // Email
                for (var key in organisation.contactInfo) {
                    var contactInfo = organisation.contactInfo[key];
                    if (contactInfo.type === 'EMAIL') {
                        ctrl.formData.email = contactInfo.detail;
                    }
                }

                if (organisation.addresses.length) {
                    ctrl.formData.street = organisation.addresses[0].street || '';
                    ctrl.formData.city = organisation.addresses[0].city || '';
                    ctrl.formData.number = organisation.addresses[0].number || '';
                    ctrl.formData.postal = parseInt(organisation.addresses[0].postal) || '';

                    // Custom field: VAT
                    if (appConfig.insightly.customFields.vat) {
                        ctrl.formData.vat = organisation.customFields[appConfig.insightly.customFields.vat] || '';
                    }
                }
            }, function() {
                ctrl.apiError = true;
            }).finally(function() {
                ctrl.loading = false;
            });
        };

        /**
         * Send the organisation update request.
         */
        ctrl.updateBillingInformation = function () {
            ctrl.error = false;

            Messages.clearMessages();
            projectaanvraagApiService.updateProjectOrganisation(ctrl.project.id, ctrl.formData).then(function(project) {
                ctrl.close();
                Messages.addMessage('success', 'De facturatiegegevens voor project "' + ctrl.project.name + '" werden correct aangepast.');
            }, function() {
                ctrl.error = true;
            })
        };


        // Try to prefill the form with an organisation
        ctrl.loadOrganisation();
    }

})();