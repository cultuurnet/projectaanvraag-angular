'use strict';

describe('Service: projectaanvraagApiService', function () {

    var apiUrl = 'http://example.com/';

    beforeEach(module('projectaanvraagApp', function($provide) {
        $provide.constant('appConfig', {
            apiUrl: apiUrl
        });
    }));

    var $httpBackend, projectaanvraagApiService, defer, $rootScope, IntegrationType, CultuurnetProject, InsightlyOrganisation;

    beforeEach(inject(function (_$httpBackend_, _projectaanvraagApiService_, _$q_, _$rootScope_, _IntegrationType_, _InsightlyOrganisation_, _CultuurnetProject_, _uitidService_) {

        $httpBackend = _$httpBackend_;
        projectaanvraagApiService = _projectaanvraagApiService_;
        defer = _$q_.defer();
        $rootScope = _$rootScope_;
        IntegrationType = _IntegrationType_;
        CultuurnetProject = _CultuurnetProject_;
        InsightlyOrganisation = _InsightlyOrganisation_;

        spyOn(_uitidService_, 'getUser').and.returnValue(defer.promise);

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
            expect(result[0] instanceof IntegrationType).toBeTruthy();
            expect(result[0].name).toEqual('Widgets');
            projectaanvraagApiService.cache.integrationTypes = 'cache';
            projectaanvraagApiService.getIntegrationTypes().then(checkCache);
        };

        $httpBackend
            .expectGET(apiUrl + 'integration-types/')
            .respond(200, response);

        projectaanvraagApiService.getIntegrationTypes().then(checkRequest);
        $httpBackend.flush();

    });

    /**
     * Test if the integration types method handles exception.
     */
    it('integration types rejects on error', function () {

        var checkError = function (error) {
            expect(error).toEqual('unable to retrieve the integration types');
        };

        $httpBackend
            .expectGET(apiUrl + 'integration-types/')
            .respond(404);

        projectaanvraagApiService.getIntegrationTypes().catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly requests the projects.
     */
    it('requests the projects', function () {

        var response = readJSON('test/json/projects.json');

        var checkCache = function (result) {
            expect(result).toEqual('cache');
        };

        var checkRequest = function (data) {
            expect(data.projects[0] instanceof CultuurnetProject).toBeTruthy();
            expect(data.projects[0].name).toEqual('UiTdatabank.be');
            projectaanvraagApiService.cache.projects[''][20][1] = 'cache';
            projectaanvraagApiService.getProjects('', 1, 20).then(checkCache);
        };

        $httpBackend
            .expectGET(apiUrl + 'project/?max=20&start=0')
            .respond(200, response);

        projectaanvraagApiService.getProjects('', 1, 20).then(checkRequest);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly requests the projects.
     */
    it('searches projects by name', function () {

        var response = readJSON('test/json/projects.json');

        projectaanvraagApiService.cache.projects.test = {};
        projectaanvraagApiService.cache.projects.test[20] = {};

        var checkRequest = function () {
            expect(projectaanvraagApiService.cache.projects.test[20][1].total).toEqual(20);
        };

        $httpBackend
            .expectGET(apiUrl + 'project/?max=20&name=test&start=0')
            .respond(200, response);

        projectaanvraagApiService.getProjects('test', 1, 20).then(checkRequest);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly requests the integration types.
     */
    it('requests a project', function () {

        var response = readJSON('test/json/project.json');

        var checkCache = function (result) {
            expect(result).toEqual('cache');
        };

        var checkRequest = function (project) {

            expect(project instanceof CultuurnetProject).toBeTruthy();
            expect(project.name).toEqual('project name');
            projectaanvraagApiService.cache.projectDetails[1] = 'cache';
            projectaanvraagApiService.getProject(1).then(checkCache);
        };

        $httpBackend
            .expectGET(apiUrl + 'project/1')
            .respond(200, response);

        projectaanvraagApiService.getProject(1).then(checkRequest);
        $httpBackend.flush();
    });

    /**
     * Test if the projects request correctly handles errors
     */
    it('rejects failed projects request', function () {
        var checkError = function (error) {
            expect(error).toEqual('unable to retrieve the projects');
        };

        $httpBackend
            .expectGET(apiUrl + 'project/?max=20&name=test&start=0')
            .respond(404);

        projectaanvraagApiService.getProjects('test', 1, 20).catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the project request correctly handles errors
     */
    it('rejects failed project request', function () {
        var checkError = function (error) {
            expect(error).toEqual('unable to retrieve the project');
        };

        $httpBackend
            .expectGET(apiUrl + 'project/1')
            .respond(404);

        projectaanvraagApiService.getProject(1).catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly creates a project
     */
    it('creates projects', function () {

        var formData = {
            name: 'name'
        };
        $httpBackend
            .expectPOST(apiUrl + 'project/', formData)
            .respond(200, '');

        projectaanvraagApiService.addProject(formData);
        $httpBackend.flush();
    });

    /**
     * Test if the creation of a project handles errors
     */
    it('rejects failed project creation request', function () {

        var errorReturned = {
            'code': 1
        };

        var checkError = function (error) {
            expect(error).toEqual(errorReturned);
        };

        var formData = {
            name: 'name'
        };

        $httpBackend
            .expectPOST(apiUrl + 'project/', formData)
            .respond(403, errorReturned);

        projectaanvraagApiService.addProject(formData).catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly activates a project
     */
    it('activates a project', function () {
        var response = {};

        $httpBackend
            .expectGET(apiUrl + 'project/1/activate')
            .respond(200, response);

        projectaanvraagApiService.activateProject(1);
    });

    /**
     * Test if the service correctly blocks a project
     */
    it('blocks a project', function () {
        var response = {};

        $httpBackend
            .expectGET(apiUrl + 'project/1/block')
            .respond(200, response);

        projectaanvraagApiService.blockProject(1);
        $httpBackend.flush();
    });

    /**
     * Test if the activate projects request handles errors
     */
    it('rejects failed activate project', function () {
        var checkError = function (error) {
            expect(error).toEqual('unable to activate the project');
        };

        $httpBackend
            .expectGET(apiUrl + 'project/1/activate')
            .respond(404);

        projectaanvraagApiService.activateProject(1).catch(checkError);
    });

    /**
     * Test if the block project request handles errors
     */
    it('rejects failed block project', function () {
        var checkError = function (error) {
            expect(error).toEqual('unable to block the project');
        };

        $httpBackend
            .expectGET(apiUrl + 'project/1/block')
            .respond(404);

        projectaanvraagApiService.blockProject(1).catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly deletes a project
     */
    it('deletes a project', function () {
        var response = {};

        $httpBackend
            .expectDELETE(apiUrl + 'project/1')
            .respond(200, response);

        projectaanvraagApiService.deleteProject(1);
        $httpBackend.flush();
    });

    /**
     * Test if the delete project request handles errors
     */
    it('rejects failed delete project', function () {
        var checkError = function (error) {
            expect(error).toEqual('unable to delete the project');
        };

        $httpBackend
            .expectDELETE(apiUrl + 'project/1')
            .respond(403);

        projectaanvraagApiService.deleteProject(1).catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly activates a project
     */
    it('activates a project', function () {
        var response = readJSON('test/json/project.json');

        var checkRequest = function (project) {
            expect(project instanceof CultuurnetProject).toBeTruthy();
            expect(project.name).toEqual('project name');
            expect(projectaanvraagApiService.cache.projectDetails[1]).toEqual(project);
        };

        $httpBackend
            .expectGET(apiUrl + 'project/1/activate')
            .respond(200, response);

        projectaanvraagApiService.activateProject(1).then(checkRequest);
        $httpBackend.flush();
    });

    /**
     * Test if the activation of a project handles errors
     */
    it('rejects failed activation', function () {
        var checkError = function (error) {
            expect(error).toEqual('unable to activate the project');
        };

        $httpBackend
            .expectGET(apiUrl + 'project/1/activate')
            .respond(403);

        projectaanvraagApiService.activateProject(1).catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly activates a project
     */
    it('requests activation', function () {
        var response = readJSON('test/json/project.json');

        var formData = {
            coupon: 'coupon'
        };
        var checkRequest = function (project) {
            expect(project instanceof CultuurnetProject).toBeTruthy();
            expect(project.name).toEqual('project name');
            expect(projectaanvraagApiService.cache.projectDetails[1]).toEqual(project);
        };

        $httpBackend
            .expectPOST(apiUrl + 'project/1/request-activation', formData)
            .respond(200, response);

        projectaanvraagApiService.requestActivation(1, formData).then(checkRequest);
        $httpBackend.flush();
    });

    /**
     * Test if the activation of a project handles errors
     */
    it('rejects failed activation request', function () {

        var errorReturned = {
            'code': 1
        };

        var checkError = function (error) {
            expect(error).toEqual(errorReturned);
        };

        var formData = {
            coupon: 'coupon'
        };

        $httpBackend
            .expectPOST(apiUrl + 'project/1/request-activation', formData)
            .respond(403, errorReturned);

        projectaanvraagApiService.requestActivation(1, formData).catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly updates content filters
     */
    it('updates content filters', function () {
        var response = readJSON('test/json/project.json');

        var formData = {
            contentFilter: 'filter'
        };
        var checkRequest = function (project) {
            expect(project instanceof CultuurnetProject).toBeTruthy();
            expect(project.name).toEqual('project name');
            expect(projectaanvraagApiService.cache.projectDetails[1]).toEqual(project);
        };

        $httpBackend
            .expectPUT(apiUrl + 'project/1/content-filter', formData)
            .respond(200, response);

        projectaanvraagApiService.updateContentFilter(1, 'filter').then(checkRequest);
        $httpBackend.flush();
    });

    /**
     * Test if the activation of a project handles errors
     */
    it('rejects content filter updates', function () {

        var checkError = function (error) {
            expect(error).toEqual('error updating content filter');
        };

        var formData = {
            contentFilter: 'filter'
        };

        $httpBackend
            .expectPUT(apiUrl + 'project/1/content-filter', formData)
            .respond(403);

        projectaanvraagApiService.updateContentFilter(1, 'filter').catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly requests the integration types.
     */
    it('requests an organisation', function () {

        var response = readJSON('test/json/organisation.json');

        var checkCache = function (result) {
            expect(result).toEqual('cache');
        };

        var checkRequest = function (organisation) {

            expect(organisation instanceof InsightlyOrganisation).toBeTruthy();
            expect(organisation.name).toEqual('naam bedrijfke');
            projectaanvraagApiService.cache.organisations[1] = 'cache';
            projectaanvraagApiService.getOrganisationByProject(1).then(checkCache);
        };

        $httpBackend
            .expectGET(apiUrl + 'project/1/organisation')
            .respond(200, response);

        projectaanvraagApiService.getOrganisationByProject(1).then(checkRequest);
        $httpBackend.flush();
    });

    /**
     * Test if the project request correctly handles errors
     */
    it('rejects failed organisation request', function () {
        var checkError = function (error) {
            expect(error).toEqual('unable to retrieve the organisation');
        };

        $httpBackend
            .expectGET(apiUrl + 'project/1/organisation')
            .respond(404);

        projectaanvraagApiService.getOrganisationByProject(1).catch(checkError);
        $httpBackend.flush();
    });

    /**
     * Test if the service correctly updates organisation info.
     */
    it('updates organisation info', function () {
        var response = readJSON('test/json/project.json');

        var formData = {
            name: 'name'
        };

        var checkRequest = function (project) {
            expect(project instanceof CultuurnetProject).toBeTruthy();
            expect(project.name).toEqual('project name');
            expect(projectaanvraagApiService.cache.projectDetails[1]).toEqual(project);
        };

        $httpBackend
            .expectPUT(apiUrl + 'project/1/organisation', formData)
            .respond(200, response);

        projectaanvraagApiService.updateOrganisationByProject(1, formData).then(checkRequest);
        $httpBackend.flush();
    });

    /**
     * Test if the updating of an organisation handles errors
     */
    it('rejects organisation info updates', function () {

        var checkError = function (error) {
            expect(error).toEqual('unable to update the organisation of the project');
        };

        var formData = {
            name: 'name'
        };

        $httpBackend
            .expectPUT(apiUrl + 'project/1/organisation', formData)
            .respond(403);

        projectaanvraagApiService.updateOrganisationByProject(1, formData).catch(checkError);
        $httpBackend.flush();
    });
});
