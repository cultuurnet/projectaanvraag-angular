'use strict';

/**
 * @ngdoc overview
 * @name projectaanvraagApp
 * @description
 * # Angular application for project aanvraag
 *
 * Main module of the application.
 */
angular
  .module('projectaanvraagApp', [
    'config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'cultuurnet.uitid',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $httpProvider) {

    var loginState = {
      name: 'login',
      url: '/login',
      component: 'loginComponent'
    };
    $stateProvider.state(loginState);

    var rootState = {
        name: 'authenticated',
        abstract : true,
        template: '<div ui-view></div>',
        resolve: {
            user: function (uitidService) {
                return uitidService.getUser();
            }
        }
      };
      $stateProvider.state(rootState);

    var dashboardState = {
      name: 'authenticated.dashboard',
      url: '',
      component: 'dashboardComponent'
    };
    $stateProvider.state(dashboardState);

    var addProjectState = {
      name: 'authenticated.addProject',
      url: '/projects/add',
      component: 'addProjectComponent'
    };
    $stateProvider.state(addProjectState);

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/json'
    };

  });