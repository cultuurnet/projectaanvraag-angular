'use strict';

describe('Service: projectaanvraagApiService', function () {

    var apiUrl = 'http://example.com/';

    beforeEach(module('projectaanvraagApp', function($provide) {
        $provide.constant('appConfig', {
            apiUrl: apiUrl
        });
    }));

    var $httpBackend, projectaanvraagApiService, defer, $rootScope;

    beforeEach(inject(function (_$httpBackend_, _projectaanvraagApiService_, _$q_, _$rootScope_) {

        $httpBackend = _$httpBackend_;
        projectaanvraagApiService = _projectaanvraagApiService_;
        defer = _$q_.defer();
        $rootScope = _$rootScope_;

    }));

    /**
     * Test if the service correctly requests the integration types.
     */
    it('requests the integration types', function () {

        var response = readJSON('test/json/integration_types.json');

        var checkCache = function (result) {
            expect(result).toEqual('cache');
        };

        var checkRequest = function (result) {
            expect(result[0].name).toEqual('Widgets');
            projectaanvraagApiService.cache.integrationTypes = 'cache';
            projectaanvraagApiService.getIntegrationTypes().then(checkCache);
        };

        $httpBackend
            .expectGET(apiUrl + 'integration-types')
            .respond(200, response);

        projectaanvraagApiService.getIntegrationTypes().then(checkRequest);
        $httpBackend.flush();

    });

    /**
     * Test if the service handles exception.
     */
    it('rejects on error', function () {

        var checkError = function (error) {
            expect(error).toEqual('unable to retrieve the integration types');
        };

        $httpBackend
            .expectGET(apiUrl + 'integration-types')
            .respond(404);

        projectaanvraagApiService.getIntegrationTypes().catch(checkError);
        $httpBackend.flush();
    });
});
