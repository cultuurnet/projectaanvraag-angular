'use strict';

describe('Controller: AppController', function () {

  beforeEach(module('projectaanvraagApp'));

  var AppController, uitid, $state, deferred, scope;

  beforeEach(inject(function ($controller, $rootScope, _$q_, _$state_, _uitidService_) {
    scope = $rootScope.$new();

    uitid = _uitidService_;
    $state = _$state_;
    deferred = _$q_.defer();

    AppController = $controller('AppController', {
      $scope: scope,
      uitidService: _uitidService_,
      $state: $state
    });
  }));

  it('sets the user', function () {
    var user = {
      name: 'Nils'
    };
    AppController.setUser(user)
    expect(AppController.user).toBe(user);
  });

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

  it('checks on states that require authentication and sets the user', function () {

    spyOn(uitid, 'getUser').and.returnValue(deferred.promise);
    spyOn(AppController, 'setUser');

    $state.go('dashboard');
    expect(uitid.getUser).toHaveBeenCalled();

    deferred.resolve('userinfo');
    scope.$digest();
    expect(AppController.setUser).toHaveBeenCalledWith('userinfo');

  });

  it('redirects to login if authentication is required', function () {

    spyOn(uitid, 'getUser').and.returnValue(deferred.promise);
    spyOn(AppController, 'redirectToLogin');

    $state.go('dashboard');
    expect(uitid.getUser).toHaveBeenCalled();

    deferred.reject();
    scope.$digest();
    expect(AppController.redirectToLogin).toHaveBeenCalled();

  });

  it("skips authentictation checks for states that don't require it", function () {

    spyOn(uitid, 'getUser')

    $state.go('login');
    expect(uitid.getUser).not.toHaveBeenCalled();

  });
});
