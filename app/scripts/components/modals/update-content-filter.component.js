(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name projectaanvraagApp.component:updateContentFilterComponent
     */
    angular
        .module('projectaanvraagApp')
        .component('updateContentFilterComponent', {
            templateUrl: 'views/modals/update-content-filter.html',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: updateContentFilterController
        });

    /* @ngInject */
    function updateContentFilterController(projectaanvraagApiService, Messages) {

        /*jshint validthis: true */
        var ctrl = this;
        var lineBreakRegex = new RegExp(/\r?\n|\r/g);

        ctrl.error = '';
        ctrl.saving = false;

        /**
         * Initialize the controller.
         */
        ctrl.$onInit = function() {
            ctrl.sapiVersion = ctrl.resolve.project.sapiVersion;
            ctrl.contentFilter = ctrl.resolve.project.contentFilter;
        };

        /**
         * Send the update request.
         */
        ctrl.updateContentFilter = function () {
            ctrl.error = '';
            ctrl.saving = true;
            if(ctrl.contentFilter){
              ctrl.contentFilter = ctrl.contentFilter.replace(lineBreakRegex,'');
            }
            Messages.clearMessages();

            projectaanvraagApiService.updateContentFilter(ctrl.resolve.project.id, ctrl.contentFilter).then(function(project) {
                Messages.addMessage('success', 'De content filter werd succesvol aangepast.');
                ctrl.close({$value: project});
                ctrl.saving = false;

            }, function() {
                ctrl.error = 'Er ging iets fout tijdens het updaten van de content filter.';
                ctrl.saving = false;
            })
        };
    }

})();
