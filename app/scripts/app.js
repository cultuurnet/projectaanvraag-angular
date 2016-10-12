'use strict';

/**
 * @ngdoc overview
 * @name projectaanvraagAngularApp
 * @description
 * # projectaanvraagAngularApp
 *
 * Main module of the application.
 */
angular
  .module('projectaanvraagAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
