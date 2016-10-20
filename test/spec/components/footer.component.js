'use strict';

describe('Component: footerComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var $componentController, projectaanvraagApiService, defer, $scope;

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {

        $scope = _$rootScope_.$new();
        $componentController = _$componentController_;
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['getIntegrationTypes']);
        defer = _$q_.defer();
    }));

    /**
     * Test if the footer loads the integration types
     */
    it('loads the integration types', function () {

        var promise = defer.promise;
        projectaanvraagApiService.getIntegrationTypes.and.returnValue(promise);

        var footerController = $componentController('footerComponent', {
            projectaanvraagApiService : projectaanvraagApiService
        }, null);

        expect(projectaanvraagApiService.getIntegrationTypes).toHaveBeenCalled();
        defer.resolve('integrationTypes');

        $scope.$digest();
        expect(footerController.integrationTypes).toEqual('integrationTypes');
    });

});
