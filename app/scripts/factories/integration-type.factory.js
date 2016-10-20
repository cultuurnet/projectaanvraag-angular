'use strict';

/**
 * @ngdoc service
 * @name projectaanvraagApp.IntegrationType
 * @description
 * # IntegrationType factory
 */
angular
  .module('projectaanvraagApp')
  .factory('IntegrationType', integrationTypeFactory);

/* @ngInject */
function integrationTypeFactory() {

  /**
   * @class IntegrationType
   * @constructor
   * @param {object}  jsonObject
   */
  var IntegrationType = function (jsonObject) {
    this.parseJson(jsonObject);
  };

  IntegrationType.prototype = {

    init: function() {
      this.id = '';
      this.name = '';
      this.description = '';
      this.price = 0;
      this.url = '';
      this.extraInfo = [];
      this.groupId = 0;
    },

    /**
     * Parse the integration type based on a parsed json object.
     * @param jsonObject
     */
    parseJson: function (jsonObject) {
      this.id = jsonObject.id;
      this.name = jsonObject.name;
      this.description = jsonObject.description;
      this.price = jsonObject.price;
      this.url = jsonObject.url;
      this.extraInfo = jsonObject.extraInfo;
      this.groupId = jsonObject.groupId;
    }
  };

  return (IntegrationType);
}
