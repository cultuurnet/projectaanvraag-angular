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
    console.log(Snap.select('.contact_r').getBBox());
    Snap.select('.contact_r').animate({transform: 'r0,2108,325t-24,13'}, 1500, mina.linear, lights);
  }

  setTimeout(function() {
    putContact();
  }, 1500);

  function lights() {
    Snap.select('.letters').addClass('flicker-in-2');
    Snap.select('.been').addClass('flicker-in-2');
  }
}
