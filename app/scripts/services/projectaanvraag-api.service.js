'use strict';

/**
 * An error object return by the projectaanvraag API.
 * @typedef {Object} ApiError
 * @property {string} code      - An error code, eg: YOU_BROKE_IT.
 * @property {string} message   - A mostly readable error message.
 * @property {string} exception - The actual exception that occurred.
 * @property {string} type      - The type of the error.
 */
/**
 * @ngdoc service
 * @name projectaanvraagApp.projectaanvraagApiService
 * @description
 * # projectaanvraagApiService
 * Service to connect with the projectaanvraag api.
 */
angular.module('projectaanvraagApp')
    .service('projectaanvraagApiService', projectaanvraagApiService);

/* @ngInject */
function projectaanvraagApiService($q, $http, appConfig, IntegrationType, CultuurnetProject) {

    var apiUrl = appConfig.apiUrl;

    /*jshint validthis: true */
    var service = this;
    service.cache = {
        projects: {},
        projectDetails: {}
    };

    /**
     * Get the integration types.
     * @returns {Promise}
     *   A promise for a list of integration types.
     */
    service.getIntegrationTypes = function () {
        var defer = $q.defer();

        if (service.cache.integrationTypes) {
            defer.resolve(service.cache.integrationTypes);
        } else {
            $http
                .get(apiUrl + 'integration-types')
                .success(function (data) {
                    var integrationTypes = [];
                    angular.forEach(data, function (item) {
                        integrationTypes.push(new IntegrationType(item));
                    });
                    service.cache.integrationTypes = integrationTypes;
                    defer.resolve(integrationTypes);
                })
                .error(function () {
                    defer.reject('unable to retrieve the integration types');
                });
        }

        return defer.promise;
    };

    /**
     * Get the list of projects for current user.
     * @returns {Promise}
     *   A promise for the list of projects.
     */
    service.getProjects = function (name, page) {
        var defer = $q.defer();

        if (service.cache.projects[name] && service.cache.projects[name][page]) {
            defer.resolve(service.cache.projects[name][page]);
        } else {

            var params = {};
            if (name) {
                params['name'] = name;
            }

            params['start'] = page * 20;

            $http
                .get(apiUrl + 'project/', {
                    params: params
                })
                .success(function (data) {
                    var projects = [];
                    angular.forEach(data, function (item) {
                        projects.push(new CultuurnetProject(item));
                    });

                    if (service.cache.projects[name] === undefined) {
                        service.cache.projects[name] = {};
                    }

                    service.cache.projects[name][page] = projects;
                    defer.resolve(projects);
                })
                .error(function () {
                    defer.reject('unable to retrieve the projects');
                });
        }

        return defer.promise;
    };

    /**
     * Get a project.
     * @returns {Promise}
     *   A promise for the list of projects.
     */
    service.getProject = function (id) {
        var defer = $q.defer();

        if (service.cache.projectDetails[id]) {
            defer.resolve(service.cache.projectDetails[id]);
        } else {
            $http
                .get(apiUrl + 'project/' + id)
                .success(function (data) {
                    var project = new CultuurnetProject(data);
                    service.cache.projectDetails.id = project;
                    defer.resolve(project);
                })
                .error(function () {
                    defer.reject('unable to retrieve the project');
                });
        }

        return defer.promise;
    };
}
