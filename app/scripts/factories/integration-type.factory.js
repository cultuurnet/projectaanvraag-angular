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
      this.sapiVersion = jsonObject.sapiVersion;

      if (jsonObject.actionButton) {
        this.actionButton = jsonObject.actionButton;
      }

    }
  };

  return (IntegrationType);
}
