'use strict';

describe('Controller: AppController', function () {

  var apiUrl = 'http://example.com/';
  var AppController, uitid, $state, deferred, scope;

  beforeEach(module('projectaanvraagApp'));

  beforeEach(module('projectaanvraagApp', function($provide) {
    $provide.constant('appConfig', {
      apiUrl: apiUrl
    });
  }));

  beforeEach(inject(function ($controller, $rootScope, _$q_, _$state_, _uitidService_) {
    scope = $rootScope.$new();

    uitid = _uitidService_;
    $state = _$state_;
    deferred = _$q_.defer();

    spyOn(uitid, 'getUser').and.returnValue(deferred.promise);

    AppController = $controller('AppController', {
      $scope: scope,
      uitidService: _uitidService_,
      $state: $state
    });
  }));

  it('logs out and redirects to login', function () {

    spyOn($state, 'go');
    spyOn(uitid, 'logout').and.returnValue(deferred.promise);

    AppController.logout();
    expect(uitid.logout).toHaveBeenCalled();

    deferred.resolve();
    scope.$digest();
    expect($state.go).toHaveBeenCalledWith('login');

  });

  it('redirects to login', function () {

    spyOn($state, 'go');

    AppController.redirectToLogin();
    expect($state.go).toHaveBeenCalledWith('login');
  });

  it('redirects to login if authentication is required', function () {

    spyOn(AppController, 'redirectToLogin');
    $state.go('authenticated.dashboard');
    deferred.reject();
    scope.$digest();

    expect(AppController.redirectToLogin).toHaveBeenCalled();
  });

  it('skips authentication checks for states that don\'t require it', function () {

    spyOn(AppController, 'redirectToLogin');

    $state.go('login');
    expect(AppController.redirectToLogin).not.toHaveBeenCalled();
  });
});
