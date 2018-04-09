'use strict';

describe('Component: updateContentFilterComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var updateController, projectaanvraagApiService, Messages, defer, $scope;

    beforeEach(inject(function (_$componentController_, _$q_, _$rootScope_, _Messages_) {

        $scope = _$rootScope_.$new();
        projectaanvraagApiService = jasmine.createSpyObj('projectaanvraagApiService', ['updateContentFilter']);
        defer = _$q_.defer();

        Messages = _Messages_;
        spyOn(Messages, 'clearMessages');
        spyOn(Messages, 'addMessage');

        updateController = _$componentController_(
            'updateContentFilterComponent',
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

        updateController.close = function() {};
        spyOn(updateController, 'close');

    }));

    /**
     * Test if the update request is sent.
     */
    it('requests an update', function () {

        var project = {
            name: 'name'
        };
        updateController.contentFilter = 'test';
        updateController.sapiVersion = '3';

        var promise = defer.promise;
        projectaanvraagApiService.updateContentFilter.and.returnValue(promise);
        updateController.updateContentFilter();
        defer.resolve(project);
        $scope.$digest();

        expect(projectaanvraagApiService.updateContentFilter).toHaveBeenCalledWith(1, 'test');
        expect(Messages.clearMessages).toHaveBeenCalled();
        expect(Messages.addMessage).toHaveBeenCalledWith('success', 'De content filter werd succesvol aangepast.');
        expect(updateController.close).toHaveBeenCalledWith({$value: project})

    });

    /**
     * Test if an error is handled.
     */
    it('handles general errors', function () {

        expect(updateController.error).toEqual('');
        var promise = defer.promise;
        projectaanvraagApiService.updateContentFilter.and.returnValue(promise);
        updateController.updateContentFilter();
        defer.reject({});
        $scope.$digest();

        expect(updateController.error).toEqual('Er ging iets fout tijdens het updaten van de content filter.');
    });
});
