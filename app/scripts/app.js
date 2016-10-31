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

    var dashboardState = {
      name: 'dashboard',
      url: '',
      component: 'dashboardComponent',
      requireAuth: true
    };
    $stateProvider.state(dashboardState);

    var addProjectState = {
      name: 'addProject',
      url: '/projects/add',
      component: 'addProjectComponent',
      requireAuth: true
    };
    $stateProvider.state(addProjectState);

    $httpProvider.defaults.withCredentials = true;
  });