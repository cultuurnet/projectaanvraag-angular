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
    function billingInformationController(projectaanvraagApiService, appConfig, Messages, InsightlyAddress, InsightlyContactInfo) {
        /*jshint validthis: true */
        var ctrl = this;

        ctrl.loading = true;
        ctrl.isSending = false;

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
                ctrl.formData.name = ctrl.organisation.name || '';

                // Email
                for (var key in ctrl.organisation.contactInfo) {
                    var contactInfo = ctrl.organisation.contactInfo[key];
                    if (contactInfo.type === 'EMAIL') {
                        ctrl.formData.email = contactInfo.detail;
                    }
                }

                if (ctrl.organisation.addresses.length) {
                    ctrl.formData.street = ctrl.organisation.addresses[0].street || '';
                    ctrl.formData.city = ctrl.organisation.addresses[0].city || '';
                    ctrl.formData.postal = parseInt(ctrl.organisation.addresses[0].postal) || '';

                    // Custom field: VAT
                    if (appConfig.insightly.customFields.vat) {
                        ctrl.formData.vat = ctrl.organisation.customFields[appConfig.insightly.customFields.vat] || '';
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
            ctrl.apiError = false;
            ctrl.isSending = true;

            ctrl.organisation.name = ctrl.formData.name;

            // If no address exists, create a new one
            if (!ctrl.organisation.addresses) {
                ctrl.organisation.addresses = [];
                ctrl.organisation.addresses[0] = new InsightlyAddress({
                    id: null,
                    type: null,
                    street: null,
                    postal: null,
                    city: null
                });
            }

            // Assign the new address values
            ctrl.organisation.addresses[0].street = ctrl.formData.street;
            ctrl.organisation.addresses[0].postal = ctrl.formData.postal;
            ctrl.organisation.addresses[0].city = ctrl.formData.city;

            // Custom field: VAT
            if (appConfig.insightly.customFields.vat && ctrl.formData.vat) {
                if (!ctrl.organisation.customFields) {
                    ctrl.organisation.customFields = {};
                }

                ctrl.organisation.customFields[appConfig.insightly.customFields.vat] = ctrl.formData.vat;
            }

            // If no contactInfo exists, create a new one
            if (!ctrl.organisation.contactInfo) {
                ctrl.organisation.contactInfo = [];
                ctrl.organisation.contactInfo[0] = new InsightlyContactInfo({
                    id: null,
                    type: 'EMAIL',
                    label: null,
                    detail: null
                });
            }

            // Assign the new ContactInfo values to the first entry with type 'EMAIL'
            for (var key in ctrl.organisation.contactInfo) {
                var contactInfo = ctrl.organisation.contactInfo[key];
                if (contactInfo.type === 'EMAIL') {
                    ctrl.organisation.contactInfo[key].detail = ctrl.formData.email;
                }
            }

            // Send the request
            projectaanvraagApiService.updateOrganisationByProject(ctrl.project.id, ctrl.organisation).then(function(project) {
                ctrl.close({$value: project});
            }, function() {
                ctrl.isSending = false;
                ctrl.error = true;
            })
        };


        // Try to prefill the form with an organisation
        ctrl.loadOrganisation();
    }

})();