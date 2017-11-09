'use strict';

angular
  .module('projectaanvraagApp')
  .component('projectaanvraagHomepageSplash', {
    templateUrl: 'views/homepage-splash.html',
    controller: projectaanvraagHomepageSplashController
  });

/* @ngInject */
function projectaanvraagHomepageSplashController() {
  function putContact() {
    /* jshint ignore:start */
    Snap.select('.contact_r').animate({transform: 'r0,2108,325t-24,13'}, 1500, mina.linear, function(){
      Snap.select('.letters').addClass('flicker-in-2');
      Snap.select('.been').addClass('flicker-in-2');
    });
    /* jshint ignore:end */
  }

  setTimeout(function() {
    putContact();
  }, 1500);

}
