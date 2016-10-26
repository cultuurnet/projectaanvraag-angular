'use strict';

/**
 * @ngdoc service
 * @name projectaanvraagApp.IntegrationType
 * @description
 * # IntegrationType factory
 */
angular
  .module('projectaanvraagApp')
  .factory('CultuurnetProject', cultuurnetProjectFactory);

/* @ngInject */
function cultuurnetProjectFactory(IntegrationType) {

  /**
   * @class CultuurnetProject
   * @constructor
   * @param {object}  jsonObject
   */
  var CultuurnetProject = function (jsonObject) {
    this.parseJson(jsonObject);
  };

  CultuurnetProject.prototype = {

    /**
     * Parse the project based on a parsed json object.
     * @param jsonObject
     */
    parseJson: function (jsonObject) {
      this.id = jsonObject.id;
      this.name = jsonObject.name;
      this.testConsumerKey = jsonObject.testConsumerKey || '';
      this.liveConsumerKey = jsonObject.liveConsumerKey || '';
      this.status = jsonObject.status || '';
      if (jsonObject.group) {
        this.group = new IntegrationType(jsonObject.group);
      }
      else {
        this.group = {};
      }
    }
  };

  return (CultuurnetProject);
}
