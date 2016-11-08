'use strict';

/**
 * @ngdoc service
 * @name projectaanvraagApp.InsightlyAddress
 * @description
 * # InsightlyAddress factory
 */
angular
  .module('projectaanvraagApp')
  .factory('InsightlyAddress', insightlyAddresssFactory);

/* @ngInject */
function insightlyAddresssFactory() {

  /**
   * @class InsightlyAddress
   * @constructor
   * @param {object}  jsonObject
   */
  var InsightlyAddress = function (jsonObject) {
    this.parseJson(jsonObject);
  };

  InsightlyAddress.prototype = {

    /**
     * Parse the insightly address based on a parsed json object.
     * @param jsonObject
     */
    parseJson: function (jsonObject) {
      this.id = jsonObject.id;
      this.type = jsonObject.type;
      this.street = jsonObject.street;
      this.city = jsonObject.city;
      this.postal = jsonObject.postal;
    }
  };

  return (InsightlyAddress);
}
