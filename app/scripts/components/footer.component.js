(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name projectaanvraagApp.component:footerComponent
     * @description
     * # footerComopnent
     */
    angular
        .module('projectaanvraagApp')
        .component('footerComponent', {
            templateUrl: 'views/footer.html',
            controller: footerController
        });

    /* @ngInject */
    function footerController(projectaanvraagApiService) {

        /*jshint validthis: true */
        var ctrl = this;
        projectaanvraagApiService.getIntegrationTypes().then(function(integrationTypes) {
            ctrl.integrationTypes = integrationTypes;
        });

    }

})();