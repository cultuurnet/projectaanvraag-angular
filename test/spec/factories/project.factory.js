'use strict';

describe('Service: projectaanvraagApiService', function () {

    var apiUrl = 'http://example.com/';

    beforeEach(module('projectaanvraagApp', function($provide) {
        $provide.constant('appConfig', {
            apiUrl: apiUrl
        });
    }));

    var CultuurnetProject, IntegrationType;

    beforeEach(inject(function (_CultuurnetProject_, _IntegrationType_) {
        CultuurnetProject = _CultuurnetProject_;
        IntegrationType = _IntegrationType_;
    }));

    /**
     * Check if it the project gets parsed.
     */
    it('parses a project without group info and without status info', function () {

        var response = readJSON('test/json/project.json');
        var project = new CultuurnetProject(response);

        expect(project.id).toEqual(3);
        expect(project.name).toEqual('project name');
        expect(project.testConsumerKey).toEqual('test key');
        expect(project.testConsumerSecret).toEqual('test secret');
        expect(project.liveConsumerKey).toEqual('live key');
        expect(project.liveConsumerSecret).toEqual('live secret');
    });

    /**
     * Check if it the project gets parsed with group info.
     */
    it('parses a project with group info and status info', function () {

        var response = readJSON('test/json/project_full_info.json');
        var project = new CultuurnetProject(response);

        expect(project.id).toEqual(3);
        expect(project.name).toEqual('project name');
        expect(project.testConsumerKey).toEqual('test key');
        expect(project.status.code).toEqual('waiting_for_payment');

        expect(project.group instanceof IntegrationType).toBeTruthy();
        expect(project.group.name).toEqual('API');
    });
});
