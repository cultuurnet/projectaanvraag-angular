'use strict';

describe('Component: dashboardItemComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var dashboardItemController, projectaanvraagApiService, defer, $q, $scope, modal;

    var fakeModal = {
        result: {
            then: function (confirmCallback, cancelCallback) {
                this.confirmCallBack = confirmCallback;
                this.cancelCallback = cancelCallback;
                return this;
            },
            catch: function (cancelCallback) {
                this.cancelCallback = cancelCallback;
                return this;
            },
            finally: function (finallyCallback) {
                this.finallyCallback = finallyCallback;
                return this;
            }
        },
        close: function (item) {
            this.result.confirmCallBack(item);
        },
        dismiss: function (item) {
            this.result.cancelCallback(item);
        },
        finally: function () {
            this.result.finallyCallback();
        }
    };

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_, _$uibModal_) {

        $scope = _$rootScope_.$new();
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['getProject', 'deleteProject']);
        defer = _$q_.defer();
        $q = _$q_;

        var promise = defer.promise;
        projectaanvraagApiService.getProject.and.returnValue(promise);
        projectaanvraagApiService.deleteProject.and.returnValue(promise);

        modal = _$uibModal_;
        spyOn(modal, 'open').and.returnValue(fakeModal);

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


    it('correctly handles the modal close', function() {
        dashboardItemController.removeItem();
        fakeModal.close();
        expect(projectaanvraagApiService.deleteProject).toHaveBeenCalled();
    });
});
