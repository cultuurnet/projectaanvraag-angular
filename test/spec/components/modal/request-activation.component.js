'use strict';

describe('Component: requestActivationComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var requestController, projectaanvraagApiService, Messages, defer, $scope;

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_, _Messages_) {

        $scope = _$rootScope_.$new();
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['requestActivation']);
        defer = _$q_.defer();

        Messages = _Messages_;
        spyOn(Messages, 'clearMessages');
        spyOn(Messages, 'addMessage');

        requestController = _$componentController_(
            'requestActivationComponent',
            {
                projectaanvraagApiService : projectaanvraagApiService,
                Messages: Messages
            },
            {
                resolve: {
                    project: {
                        id: 1,
                        title: 'test'
                    }
                }
            }
        );

        requestController.close = function() {};
        spyOn(requestController, 'close');

    }));

    /**
     * Test if the coupon field is toggled.
     */
    it('handles activation errors', function () {

        expect(requestController.showCoupon).toBeFalsy();
        requestController.toggleCoupon();
        expect(requestController.showCoupon).toBeTruthy();
    });

    /**
     * Test if the activation is sent without coupon.
     */
    it('requests the activation without coupon', function () {
        requestController.showCoupon = false;
        requestController.formData  = {
            coupon: 'test reset',
            title: 'title'
        };

        var project = {
            name: 'name'
        };
        var promise = defer.promise;
        projectaanvraagApiService.requestActivation.and.returnValue(promise);
        requestController.requestActivation();
        defer.resolve(project);
        $scope.$digest();

        expect(projectaanvraagApiService.requestActivation).toHaveBeenCalledWith(1, {title: 'title'});
        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(Messages.addMessage).toHaveBeenCalledWith('success', 'Je aanvraag tot activatie werd succesvol verstuurd.');
        expect(requestController.close).toHaveBeenCalledWith({$value: project})

    });

    /**
     * Test if the activation is sent with coupon.
     */
    it('requests the activation without coupon', function () {
        requestController.showCoupon = true;
        requestController.formData  = {
            coupon: 'test reset',
            title: 'title'
        };

        var project = {
            name: 'name'
        };
        var promise = defer.promise;
        projectaanvraagApiService.requestActivation.and.returnValue(promise);
        requestController.requestActivation();
        defer.resolve(project);
        $scope.$digest();

        expect(projectaanvraagApiService.requestActivation).toHaveBeenCalledWith(1, requestController.formData);
        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(Messages.addMessage).toHaveBeenCalledWith('success', 'Je project werd succesvol geactiveerd.');
        expect(requestController.close).toHaveBeenCalledWith({$value: project})
    });

    /**
     * Test if the activation error is handled.
     */
    it('handles activation errors', function () {

        expect(requestController.error).toBeFalsy();
        var promise = defer.promise;
        projectaanvraagApiService.requestActivation.and.returnValue(promise);
        requestController.requestActivation();
        defer.reject();
        $scope.$digest();

        expect(requestController.error).toBeTruthy();
    });
});
