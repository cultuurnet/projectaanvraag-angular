(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name projectaanvraagApp.component:confirmationModalComponent
     * @description
     * # confirmationComponent*/
    angular
        .module('projectaanvraagApp')
        .component('confirmationComponent', {
            templateUrl: 'views/modals/confirmation.html',
            controller: confirmationController,
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            }
        });

    /* @ngInject */
    function confirmationController() {
        /*jshint validthis: true */
        var ctrl = this;

        /**
         * Initialize the controller.
         */
        ctrl.$onInit = function() {
            ctrl.title = ctrl.resolve.title;
            ctrl.message = ctrl.resolve.message;
            ctrl.cancel = ctrl.resolve.cancel || 'Annuleren';
            ctrl.confirm = ctrl.resolve.confirm || 'Bevestigen';
            ctrl.type = ctrl.resolve.type || 'primary';
        }
    }

})();