'use strict';

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
function projectaanvraagApiService($q, $http, appConfig, IntegrationType, CultuurnetProject, InsightlyOrganisation) {

    var apiUrl = appConfig.apiUrl;

    /*jshint validthis: true */
    var service = this;
    service.cache = {
        projects: {},
        projectDetails: {},
        organisations: {}
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
                .then(function (response) {
                    var integrationTypes = [];
                    angular.forEach(response.data, function (item) {
                        integrationTypes.push(new IntegrationType(item));
                    });
                    service.cache.integrationTypes = integrationTypes;
                    defer.resolve(integrationTypes);
                })
                .catch(function () {
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
    service.getProjects = function (name, page, maxResults) {
        var defer = $q.defer();

        if (service.cache.projects[name] && service.cache.projects[name][maxResults] && service.cache.projects[name][maxResults][page]) {
            defer.resolve(service.cache.projects[name][maxResults][page]);
        } else {

            var params = {};
            if (name) {
                params['name'] = name;
            }

            params['start'] = (page - 1 ) * maxResults;
            params['max'] = maxResults;

            $http
                .get(apiUrl + 'project/', {
                    params: params
                })
                .then(function (response) {

                    var projects = [];
                    angular.forEach(response.data.results, function (item) {
                        projects.push(new CultuurnetProject(item));
                    });

                    if (service.cache.projects[name] === undefined) {
                        service.cache.projects[name] = {};
                    }

                    if (service.cache.projects[name][maxResults] === undefined) {
                        service.cache.projects[name][maxResults] = {};
                    }

                    service.cache.projects[name][maxResults][page] = {
                        total: parseInt(response.data.total),
                        projects: projects
                    };

                    defer.resolve(service.cache.projects[name][maxResults][page]);
                })
                .catch(function () {
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
                .then(function (response) {
                    var project = new CultuurnetProject(response.data);
                    service.cache.projectDetails[id] = project;
                    defer.resolve(project);
                })
                .catch(function () {
                    defer.reject('unable to retrieve the project');
                });
        }

        return defer.promise;
    };

    /**
     * Create a project.
     * @returns {Promise}
     *   A promise with a response.
     */
    service.addProject = function (formData) {
        var defer = $q.defer();

        $http.post(apiUrl + 'project/', formData)
            .then(function (response) {
                service.cache.projects = {};
                defer.resolve(response.data);
            })
            .catch(function (response) {
                defer.reject(response.data);
            });

        return defer.promise;
    };

    /**
     * Delete a project.
     * @returns {Promise}
     *   A promise with a response.
     */
    service.deleteProject = function (id) {
        var defer = $q.defer();

        $http.delete(apiUrl + 'project/' + id)
            .then(function () {
                defer.resolve();
            })
            .catch(function () {
                defer.reject('unable to delete the project');
            });

        return defer.promise;
    };

    /**
     * Block a project.
     * @returns {Promise}
     *   A promise with a response.
     */
    service.blockProject = function (id) {
        var defer = $q.defer();

        $http.get(apiUrl + 'project/' + id + '/block')
            .then(function (response) {
                var project = new CultuurnetProject(response.data);
                service.cache.projectDetails[id] = project;
                defer.resolve(project);
            })
            .catch(function () {
                defer.reject('unable to block the project');
            });

        return defer.promise;
    };

    /**
     * Activate a project.
     * @returns {Promise}
     *   A promise with a response.
     */
    service.activateProject = function (id) {
        var defer = $q.defer();

        $http.get(apiUrl + 'project/' + id + '/activate')
            .then(function (response) {
                var project = new CultuurnetProject(response.data);
                service.cache.projectDetails[id] = project;
                defer.resolve(project);
            })
            .catch(function () {
                defer.reject('unable to activate the project');
            });

        return defer.promise;
    };

    /**
     * Request the activation of a project.
     * @returns {Promise}
     *   A promise with a response.
     */
    service.requestActivation = function (id, formData) {
        var defer = $q.defer();

        $http.post(apiUrl + 'project/' + id + '/request-activation', formData)
            .then(function (response) {
                var project = new CultuurnetProject(response.data);
                service.cache.projectDetails[id] = project;
                defer.resolve(project);
            })
            .catch(function (response) {
                defer.reject(response.data);
            });

        return defer.promise;
    };

    /**
     * Update the content filter.
     * @param id
     * @param contentFilter
     */
    service.updateContentFilter = function(id, contentFilter) {
        var defer = $q.defer();

        var formData = {
            'contentFilter': contentFilter
        };

        $http.put(apiUrl + 'project/' + id + '/content-filter', formData)
            .then(function (response) {
                var project = new CultuurnetProject(response.data);
                service.cache.projectDetails[id] = project;
                defer.resolve(project);
            })
            .catch(function () {
                defer.reject('error updating content filter');
            });

        return defer.promise;
    };

    /**
     * Get the organisation linked to a project.
     *
     * @returns {Promise}
     *   A promise with a response.
     */
    service.getOrganisationByProject = function (id) {
        var defer = $q.defer();

        if (service.cache.organisations[id]) {
            defer.resolve(service.cache.organisations[id]);
        } else {
            $http
                .get(apiUrl + 'project/' + id + '/organisation')
                .then(function (response) {
                    var organisation = new InsightlyOrganisation(response.data);
                    service.cache.organisations[id] = organisation;
                    defer.resolve(organisation);
                })
                .catch(function () {
                    defer.reject('unable to retrieve the organisation');
                });
        }

        return defer.promise;
    };

    /**
     * Update the organisation linked to a project.
     *
     * @returns {Promise}
     *   A promise with a response.
     */
    service.updateOrganisationByProject = function (id, organisation) {
        var defer = $q.defer();

        $http.put(apiUrl + 'project/' + id + '/organisation', organisation)
            .then(function (response) {
                var project = new CultuurnetProject(response.data);
                service.cache.projectDetails[id] = project;
                defer.resolve(project);
            })
            .catch(function () {
                defer.reject('unable to update the organisation of the project');
            });

        return defer.promise;
    };
}
