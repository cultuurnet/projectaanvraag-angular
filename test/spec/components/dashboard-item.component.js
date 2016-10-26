'use strict';

describe('Component: dashboardItemComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var dashboardItemController, projectaanvraagApiService, defer, $scope;

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_) {

        $scope = _$rootScope_.$new();
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['getProject']);
        defer = _$q_.defer();

        var promise = defer.promise;
        projectaanvraagApiService.getProject.and.returnValue(promise);

        dashboardItemController = _$componentController_(
            'dashboardItemComponent',
            {
                projectaanvraagApiService : projectaanvraagApiService
            },
            {
                data: {'id': 1}
            }
        );

    }));

    /**
     * Test if the dashboard item loads the project.
     */
    it('loads the project', function () {

        expect(dashboardItemController.fetching).toBeTruthy();

        expect(projectaanvraagApiService.getProject).toHaveBeenCalled();
        defer.resolve('project');

        $scope.$digest();
        expect(dashboardItemController.fetching).toBeFalsy();
        expect(dashboardItemController.project).toEqual('project');
    });

    /**
     * It stops loading when having a problem
     */
    it('stops loading when having a problem', function () {

        defer.reject();

        $scope.$digest();
        expect(dashboardItemController.fetching).toBeFalsy();
    });

    /**
     * Test the isLive method.
     */
    it('correctly sees a project as live', function () {

        dashboardItemController.project = {
            status: {
                code: 'active'
            }
        };

        expect(dashboardItemController.isLive()).toBeTruthy();

        dashboardItemController.project = {
            status: {
                code: 'application_sent'
            }
        };
        expect(dashboardItemController.isLive()).toBeFalsy();
    });

    /**
     * Test the isInactive method.
     */
    it('correctly sees a project as live', function () {

        dashboardItemController.project = {
            status: {
                code: 'application_sent'
            }
        };

        expect(dashboardItemController.isInactive()).toBeTruthy();

        dashboardItemController.project = {
            status: {
                code: 'active'
            }
        };
        expect(dashboardItemController.isInactive()).toBeFalsy();
    });
});
