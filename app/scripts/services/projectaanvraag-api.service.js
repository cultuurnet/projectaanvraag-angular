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
function projectaanvraagApiService($q, $http, appConfig, IntegrationType) {

    var apiUrl = appConfig.apiUrl;

    /*jshint validthis: true */
    var service = this;
    service.cache = [];

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
}
