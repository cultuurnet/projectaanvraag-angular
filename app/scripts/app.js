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
    'ui.bootstrap',
    'angular.filter'
  ])
  /* @ngInject */
  .config(function ($stateProvider, $httpProvider, $urlRouterProvider, $qProvider) {

    $qProvider.errorOnUnhandledRejections(false);

    var loginState = {
      name: 'login',
      url: '/login',
      component: 'loginComponent'
    };
    $stateProvider.state(loginState);

    var integrationsState = {
      name: 'integrations',
      url: '/integrations',
      component: 'integrationsComponent'
    };
    $stateProvider.state(integrationsState);

    var rootState = {
        name: 'authenticated',
        abstract : true,
        template: '<div ui-view></div>',
        resolve: {
            /* @ngInject */
            user: function (uitidService) {
                return uitidService.getUser();
            }
        }
      };
      $stateProvider.state(rootState);

    var dashboardState = {
      name: 'authenticated.dashboard',
      url: '/',
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

    $urlRouterProvider.otherwise('/');

  })
  .directive('vertilizeContainer', [
  function(){
    return {
      restrict: 'EA',
      controller: [
        '$scope', '$window',
        function($scope, $window){
          // Alias this
          var _this = this;

          // Array of children heights
          _this.childrenHeights = [];

          // API: Allocate child, return index for tracking.
          _this.allocateMe = function(){
            _this.childrenHeights.push(0);
            return (_this.childrenHeights.length - 1);
          };

          // API: Update a child's height
          _this.updateMyHeight = function(index, height){
            _this.childrenHeights[index] = height;
          };

          // API: Get tallest height
          _this.getTallestHeight = function(){
            var height = 0;
            for (var i=0; i < _this.childrenHeights.length; i=i+1){
              height = Math.max(height, _this.childrenHeights[i]);
            }
            return height;
          };

          // Add window resize to digest cycle
          angular.element($window).bind('resize', function(){
            return $scope.$apply();
          });
        }
      ]
    };
  }
]);
