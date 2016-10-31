'use strict';

describe('Component: dashboardItemComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var dashboardItemController, projectaanvraagApiService, defer, $q, $scope, $rootScope, modal, modalInstance, $httpBackend;

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_, _$uibModal_) {

        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['getProject', 'deleteProject']);
        defer = _$q_.defer();
        $q = _$q_;

        var promise = defer.promise;
        projectaanvraagApiService.getProject.and.returnValue(promise);

        //modal = new FakeModal();
        modal = _$uibModal_;
        var original = modal.open;
        spyOn(modal, 'open').and.callFake(function () {
            modalInstance = original.apply(null, arguments);
            return modalInstance;
        });

        dashboardItemController = _$componentController_(
            'dashboardItemComponent',
            {
                projectaanvraagApiService : projectaanvraagApiService,
                $uibModal: modal
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

    it('correctly opens the modal', function() {
        dashboardItemController.removeItem();
        expect(modal.open).toHaveBeenCalled();
    });

    /*
    it('correctly handles the modal close', function() {

        dashboardItemController.removeItem();
        $scope.digest();

        console.log(modalInstance);
        modalInstance.close();
        $scope.$digest();

        expect(projectaanvraagApiService.deleteProject).toHaveBeenCalled();
    });*/
});
