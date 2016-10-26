'use strict';

describe('Component: footerComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var footerController, projectaanvraagApiService, defer, $scope;

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {

        $scope = _$rootScope_.$new();
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['getIntegrationTypes']);
        defer = _$q_.defer();

        var promise = defer.promise;
        projectaanvraagApiService.getIntegrationTypes.and.returnValue(promise);

        footerController = _$componentController_('footerComponent', {
            projectaanvraagApiService : projectaanvraagApiService
        }, null);
    }));

    /**
     * Test if the footer loads the integration types
     */
    it('loads the integration types', function () {
        expect(projectaanvraagApiService.getIntegrationTypes).toHaveBeenCalled();
        defer.resolve('integrationTypes');

        $scope.$digest();
        expect(footerController.integrationTypes).toEqual('integrationTypes');
    });

});
