'use strict';

describe('Component: dashboardComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var dashboardController, projectaanvraagApiService, defer, $scope;

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {

        $scope = _$rootScope_.$new();
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['getProjects']);
        defer = _$q_.defer();

        var promise = defer.promise;
        projectaanvraagApiService.getProjects.and.returnValue(promise);

        dashboardController = _$componentController_('dashboardComponent', {
            projectaanvraagApiService : projectaanvraagApiService
        }, null);

    }));

    /**
     * Test if the dashboard loads the projects.
     */
    it('loads the projects', function () {
        expect(dashboardController.loading).toBeTruthy();

        expect(projectaanvraagApiService.getProjects).toHaveBeenCalled();
        defer.resolve('projects');

        $scope.$digest();
        expect(dashboardController.loading).toBeFalsy();
        expect(dashboardController.projects).toEqual('projects');
    });

    /**
     * Test if the dashboard shows errors when projects could not be loaded.
     */
    it('show an error message when having a problem the projects', function () {
        defer.reject();

        $scope.$digest();
        expect(dashboardController.loading).toBeFalsy();
    });

});
