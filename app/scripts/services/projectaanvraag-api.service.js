'use strict';

/**
 * An response object returned by the projectaanvraag API.
 * @typedef {Object} ApiResponse
 * @property {string} type              - The response type (success or error).
 * @property {ApiMessage[]} messages    - The reponse messages.
 * @property {ApiError[]} errors        - The reponse errors.
 * @property {Array} data               - The response data.
 *
 * A message object returned by the projectaanvraag API.
 * @typedef {Object} ApiMessage
 * @property {string} message   - A human readable error message.
 * @property {string} type      - The type of the message.
 *
 * An error object returned by the projectaanvraag API.
 * @typedef {Object} ApiError
 * @property {string} code      - An error code, eg: YOU_BROKE_IT.
 * @property {string} message   - A human readable error message.
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
function projectaanvraagApiService($q, $http, appConfig, IntegrationType) {

    var apiUrl = appConfig.apiUrl;

    /*jshint validthis: true */
    var service = this;
    service.cache = [];

    var postConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };

    /**
     * @returns {Promise}
     *   A promise with a list of integration types.
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
     * @returns {Promise}
     *   A promise with a response.
     */
    service.addProject = function (formData) {
        var defer = $q.defer();

        $http.post(apiUrl + 'projects/add', $.param(formData), postConfig)
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, header, config) {
                defer.reject('Unable to add a new project');
            });

        return defer.promise;
    };
}
