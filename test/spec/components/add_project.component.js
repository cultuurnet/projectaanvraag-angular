'use strict';

describe('Component: addProjectComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var controller, projectaanvraagApiService, defer, $scope, $state, Messages, $q;

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_, _$state_, _Messages_) {

        $scope = _$rootScope_.$new();
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['getIntegrationTypes', 'addProject']);
        defer = _$q_.defer();
        $q = _$q_;
        $state = _$state_;

        var promise = defer.promise;
        projectaanvraagApiService.getIntegrationTypes.and.returnValue(promise);

        Messages = _Messages_;
        spyOn(Messages, 'clearMessages');
        spyOn(Messages, 'addMessage');

        var apiErrorCodes = {
            error1: {
                label: 'error 1',
            }
        };

        controller = _$componentController_('addProjectComponent', {
            projectaanvraagApiService : projectaanvraagApiService,
            $state: _$state_,
            apiErrorCodes: apiErrorCodes
        }, null);

    }));

    /**
     * Test if the dashboard loads the projects.
     */
    it('loads integration types', function () {

        expect(projectaanvraagApiService.getIntegrationTypes).toHaveBeenCalled();

        defer.resolve('integration types');
        $scope.$digest();

        expect(controller.integrationTypes).toEqual('integration types');
    });

    /**
     * Test if the form submit is handled if validation is ok.
     */
    it('submits the form', function () {

        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.addProject.and.returnValue(promise);

        spyOn($state, 'go');
        controller.formData = {
            name: 'name'
        };

        controller.processForm(true);

        defer2.resolve();
        $scope.$digest();

        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(projectaanvraagApiService.addProject).toHaveBeenCalledWith(controller.formData);
        expect(Messages.addMessage).toHaveBeenCalledWith('success', 'Je project is aangemaakt. Je vindt het hieronder in de lijst terug.');
        expect($state.go).toHaveBeenCalledWith('authenticated.dashboard');
    });

    /**
     * Test if the form submit correctly removes coupon.
     */
    it('submits the form', function () {

        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.addProject.and.returnValue(promise);

        spyOn($state, 'go');
        controller.formData = {
            coupon: 'coupon',
            name: 'name',
        };

        controller.processForm(true);

        defer2.resolve();
        $scope.$digest();

        expect(projectaanvraagApiService.addProject).toHaveBeenCalledWith({name: 'name'});
    });

    /**
     * Test if the form shows a general error.
     */
    it('show an error message when having a problem', function () {

        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.addProject.and.returnValue(promise);

        controller.formData = {
            coupon: 'coupon',
            name: 'name',
        };

        controller.processForm(true);

        defer2.reject();
        $scope.$digest();
        expect(Messages.addMessage).toHaveBeenCalledWith('danger', 'Er ging iets mis. Probeer het later opnieuw.');
    });

    /**
     * Test if the form shows a specific error.
     */
    it('show an knwon error message when having a problem', function () {

        var defer2 = $q.defer();
        var promise = defer2.promise;
        projectaanvraagApiService.addProject.and.returnValue(promise);

        controller.formData = {
            coupon: 'coupon',
            name: 'name',
        };

        controller.processForm(true);

        defer2.reject({
            code: 'error1'
        });
        $scope.$digest();
        expect(Messages.addMessage).toHaveBeenCalledWith('danger', 'error 1');
    });

    /**
     * Test if the form shows a required fields error.
     */
    it('show an error message when having a problem the projects', function () {
        controller.processForm(false);
        expect(Messages.addMessage).toHaveBeenCalledWith('danger', 'Gelieve de verplichte velden in te vullen.');
    });

    /**
     * Test if the form shows a required fields error.
     */
    it('redirects to dashboard', function () {
        spyOn($state, 'go');
        controller.redirectToDashboard();
        expect($state.go).toHaveBeenCalledWith('authenticated.dashboard');
    });
});
