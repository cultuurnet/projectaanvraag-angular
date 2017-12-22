'use strict';

describe('Component: dashboardItemComponent', function () {

    beforeEach(module('projectaanvraagApp', function($provide) {
        $provide.constant('appConfig', {
            'widgetsApplicationUrlLive' : 'http://localhost:4200',
            'widgetsApplicationUrlTest' : 'http://localhost:4200',
        });
    }));

    var dashboardItemController, projectaanvraagApiService, defer, $q, $scope, modal, Messages;

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

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_, _$uibModal_, _projectaanvraagApiService_, _Messages_) {

        $scope = _$rootScope_.$new();
        projectaanvraagApiService = _projectaanvraagApiService_;
        spyOn(projectaanvraagApiService, 'getProject');
        defer = _$q_.defer();
        $q = _$q_;

        // Add promise for load project.
        var promise = defer.promise;
        projectaanvraagApiService.getProject.and.returnValue(promise);

        // Add modal mock.
        modal = _$uibModal_;
        spyOn(modal, 'open').and.returnValue(fakeModal);

        // Add messages mock.
        Messages = _Messages_;
        spyOn(Messages, 'clearMessages');
        spyOn(Messages, 'addMessage');

        var onUpdate = function () {};
        dashboardItemController = _$componentController_(
            'dashboardItemComponent',
            {
                projectaanvraagApiService : projectaanvraagApiService,
                $uibModal: modal,
            },
            {
                detail: {'id': 1},
                onUpdate: onUpdate
            }
        );

    }));

    /**
     * Test if the dashboard item loads the project.
     */
    it('loads the project', function () {

        expect(dashboardItemController.fetching).toBeTruthy();

        dashboardItemController.$onInit();
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

        dashboardItemController.$onInit();
        defer.reject();

        $scope.$digest();
        expect(dashboardItemController.fetching).toBeFalsy();
    });


    /**
     * Test the isBlocked method.
     */
    it('correctly sees a project as blocked', function () {
        dashboardItemController.project = {
            status: {
                code: 'blocked'
            }
        };

        expect(dashboardItemController.isBlocked()).toBeTruthy();

        dashboardItemController.project = {
            status: {
                code: 'application_sent'
            }
        };
        expect(dashboardItemController.isBlocked()).toBeFalsy();
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

    /**
     * Test the opening of the removal confirmation.
     */
    it('correctly opens the modal when requesting removal', function() {
        dashboardItemController.removeItem();
        expect(modal.open).toHaveBeenCalled();
    });

    /**
     * Test the removal confirmation handling.
     */
    it('correctly handles the removal confirmation', function() {

        // Resolve load of project.
        dashboardItemController.$onInit();
        defer.resolve({
            name: 'name'
        });

        spyOn(projectaanvraagApiService, 'deleteProject');
        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.deleteProject.and.returnValue(promise);

        dashboardItemController.removeItem();
        spyOn(dashboardItemController, 'onUpdate');
        fakeModal.close();
        defer2.resolve(dashboardItemController.project);
        $scope.$digest();

        expect(projectaanvraagApiService.deleteProject).toHaveBeenCalled();
        expect(dashboardItemController.onUpdate).toHaveBeenCalled();
        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(Messages.addMessage).toHaveBeenCalledWith('success', 'Het project "name" werd correct verwijderd.');
    });

    /**
     * Test the removal confirmation error handling.
     */
    it('shows a message when removal went wrong', function() {

        // Resolve load of project.
        dashboardItemController.$onInit();
        defer.resolve({
            name: 'name'
        });
        $scope.$digest();

        spyOn(projectaanvraagApiService, 'deleteProject');
        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.deleteProject.and.returnValue(promise);

        // Open modal and reject removal.
        dashboardItemController.removeItem();
        fakeModal.close();
        defer2.reject();
        $scope.$digest();

        expect(projectaanvraagApiService.deleteProject).toHaveBeenCalled();
        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(Messages.addMessage).toHaveBeenCalledWith('danger', 'Er ging iets mis. Probeer het later opnieuw.');
    });

    /**
     * Test the block confirmation handling.
     */
    it('correctly handles the block confirmation', function() {

        // Resolve load of project.
        dashboardItemController.$onInit();
        var returnedProject = {
            name: 'name2'
        };
        defer.resolve({
            name: 'name'
        });

        spyOn(projectaanvraagApiService, 'blockProject');
        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.blockProject.and.returnValue(promise);

        dashboardItemController.blockItem();
        spyOn(dashboardItemController, 'onUpdate');
        fakeModal.close();
        defer2.resolve(returnedProject);
        $scope.$digest();

        expect(projectaanvraagApiService.blockProject).toHaveBeenCalled();
        expect(dashboardItemController.project).toEqual(returnedProject);
        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(Messages.addMessage).toHaveBeenCalledWith('success', 'Het project "name2" werd correct geblokkeerd.');
    });

    /**
     * Test the block confirmation error handling.
     */
    it('shows a message when blocking went wrong', function() {

        // Resolve load of project.
        dashboardItemController.$onInit();
        defer.resolve({
            name: 'name'
        });
        $scope.$digest();

        spyOn(projectaanvraagApiService, 'blockProject');
        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.blockProject.and.returnValue(promise);

        // Open modal and reject block.
        dashboardItemController.blockItem();
        fakeModal.close();
        defer2.reject();
        $scope.$digest();

        expect(projectaanvraagApiService.blockProject).toHaveBeenCalled();
        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(Messages.addMessage).toHaveBeenCalledWith('danger', 'Er ging iets mis. Probeer het later opnieuw.');
    });

    /**
     * Test the activation confirmation handling.
     */
    it('correctly handles the activation confirmation', function() {

        // Resolve load of project.
        dashboardItemController.$onInit();
        var returnedProject = {
            name: 'name2'
        };
        defer.resolve({
            name: 'name'
        });

        spyOn(projectaanvraagApiService, 'activateProject');
        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.activateProject.and.returnValue(promise);

        dashboardItemController.activateItem();
        fakeModal.close();
        defer2.resolve(returnedProject);
        $scope.$digest();

        expect(projectaanvraagApiService.activateProject).toHaveBeenCalled();
        expect(dashboardItemController.project).toEqual(returnedProject);
        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(Messages.addMessage).toHaveBeenCalledWith('success', 'Het project "name2" werd correct geactiveerd.');
    });

    /**
     * Test the block confirmation error handling.
     */
    it('shows a message when activating went wrong', function() {

        // Resolve load of project.
        dashboardItemController.$onInit();
        defer.resolve({
            name: 'name'
        });
        $scope.$digest();

        spyOn(projectaanvraagApiService, 'activateProject');
        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.activateProject.and.returnValue(promise);

        // Open modal and reject block.
        dashboardItemController.activateItem();
        fakeModal.close();
        defer2.reject();
        $scope.$digest();

        expect(projectaanvraagApiService.activateProject).toHaveBeenCalled();
    });

    /**
     * Test the request activation submit handling.
     */
    it('correctly handles the request activation submit', function() {

        // Resolve load of project.
        dashboardItemController.$onInit();
        var returnedProject = {
            name: 'name2'
        };

        dashboardItemController.requestActivation();
        fakeModal.close(returnedProject);
        $scope.$digest();

        expect(dashboardItemController.project).toEqual(returnedProject);
    });

    /**
     * Test the update content filter submit handling.
     */
    it('correctly handles the update content filter submit', function() {

        // Resolve load of project.
        dashboardItemController.$onInit();
        var returnedProject = {
            name: 'name2'
        };

        dashboardItemController.updateContentFilter();
        fakeModal.close(returnedProject);
        $scope.$digest();

        expect(dashboardItemController.project).toEqual(returnedProject);
    });

    /**
     * Test the update billing information submit handling.
     */
    it('correctly handles the billing information submit', function() {

        // Resolve load of project.
        dashboardItemController.$onInit();
        var returnedProject = {
            name: 'name2'
        };

        dashboardItemController.updateBillingInformation();
        fakeModal.close(returnedProject);
        $scope.$digest();

        expect(dashboardItemController.project).toEqual(returnedProject);
        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(Messages.addMessage).toHaveBeenCalledWith('success', 'De facturatiegegevens voor project "name2" werden succesvol aangepast.');
    });

});
