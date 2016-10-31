(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name projectaanvraagApp.component:facturationDetailsFormComponent
     * @description
     * # facturationDetailsForm
     * shows a form to enter the facturation details.
     */
    angular
        .module('projectaanvraagApp')
        .component('facturationDetailsFormComponent', {
            templateUrl: 'views/modals/facturation-details-form.html',
            bindings: {
                parentCtrl: '='
            }
        });

})();