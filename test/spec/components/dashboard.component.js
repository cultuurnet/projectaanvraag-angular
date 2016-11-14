'use strict';

describe('Component: dashboardComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var dashboardController, projectaanvraagApiService, defer, $scope, $state;

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_, _$state_) {

        $scope = _$rootScope_.$new();
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['getProjects']);
        defer = _$q_.defer();
        $state = _$state_;

        var promise = defer.promise;
        projectaanvraagApiService.getProjects.and.returnValue(promise);

        dashboardController = _$componentController_('dashboardComponent', {
            projectaanvraagApiService : projectaanvraagApiService,
            $state: _$state_
        }, null);

    }));

    /**
     * Test if the dashboard loads the projects.
     */
    it('searches projects at load', function () {

        expect(dashboardController.loading).toBeTruthy();
        expect(projectaanvraagApiService.getProjects).toHaveBeenCalled();

        defer.resolve({
            total: 30,
            projects: 'projects'
        });
        $scope.$digest();

        expect(dashboardController.loading).toBeFalsy();
        expect(dashboardController.totalProjects).toEqual(30);
        expect(dashboardController.projects).toEqual('projects');
    });

    /**
     * Test if the dashboard paging is done.
     */
    it('searches projects', function () {

        defer.resolve({
            total: 30,
            projects: 'projects'
        });

        dashboardController.nameFilter = 'test';
        dashboardController.currentPage = 2;

        dashboardController.searchProjects();

        defer.resolve({
            total: 30,
            projects: 'projects'
        });

        $scope.$digest();
        expect(projectaanvraagApiService.getProjects).toHaveBeenCalledWith('test', 2, 20);


    });

    /**
     * Test if the dashboard shows errors when projects could not be loaded.
     */
    it('show an error message when having a problem the projects', function () {
        defer.reject();
        $scope.$digest();
        expect(dashboardController.loading).toBeFalsy();
    });

    /**
     * Test if the user is redirected to the create project page.
     */
    it('redirects to create project', function () {
        spyOn($state, 'go');
        dashboardController.redirectToCreate();
        expect($state.go).toHaveBeenCalledWith('authenticated.addProject');
    });

});
