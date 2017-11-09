'use strict';

angular
  .module('projectaanvraagApp')
  .component('projectaanvraagHomepageSplash', {
    templateUrl: 'views/homepage-splash.html',
    controller: projectaanvraagHomepageSplashController
  });

/* @ngInject */
function projectaanvraagHomepageSplashController() {
  /* jshint ignore:start */
  var s = Snap('.hero-image');
  Snap.load('images/hero.svg', onSVGLoaded);

  function onSVGLoaded(data){
      s.append(data);
  }

  function putContact() {

    Snap.select('.contact_r').animate({transform: 'r0,2108,325t-24,13'}, 1200, mina.linear, function(){
      Snap.select('.letters').addClass('flicker-in-2');
      Snap.select('.been').addClass('flicker-in-2');
    });

  }

  setTimeout(function() {
    putContact();
  }, 1500);
   /* jshint ignore:end */

}
