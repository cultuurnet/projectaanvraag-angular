(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name projectaanvraagApp.component:billingInformationDetailsFormComponent
     * @description
     * # billingInformationDetailsFormComponent
     * shows a form to enter the billing information.
     */
    angular
        .module('projectaanvraagApp')
        .component('billingInformationDetailsFormComponent', {
            templateUrl: 'views/modals/billing-information-form.html',
            bindings: {
                parentCtrl: '='
            }
        });

})();