'use strict';

describe('Component: loginComponent', function () {

  beforeEach(module('projectaanvraagApp'));

  var loginController, uitidService, $location, $state;

  beforeEach(inject(function (_$componentController_, _$location_, _$state_) {

    uitidService = jasmine.createSpyObj('uitidService', ['login']);
    $location = _$location_;
    $state = _$state_;

    loginController = _$componentController_('loginComponent', {
      uitidService : uitidService,
      $location: $location,
      $state: _$state_
    }, null);

  }));

  /**
   * Test if user is redirect to current destination after login.
   */
  it('redirects to the authentication page with current destination', function () {

    spyOn($location, 'absUrl').and.returnValue('http://www.example.com');
    loginController.login();
    expect(uitidService.login).toHaveBeenCalledWith('http://www.example.com');
  });

  /**
   * Test if user is redirect to dashboard, if he logged in on login page.
   */
  it('redirects to the authentication page with dashboard if user is on login page', function () {

    $state.current.name = 'login';
    spyOn($state, 'href').and.returnValue('http://www.example2.com');

    loginController.login();

    expect($state.href).toHaveBeenCalledWith('dashboard', {}, {absolute: true});
    expect(uitidService.login).toHaveBeenCalledWith('http://www.example2.com');
  });
});
