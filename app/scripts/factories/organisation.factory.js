'use strict';

/**
 * @ngdoc service
 * @name projectaanvraagApp.InsightlyOrganisation
 * @description
 * # InsightlyOrganisation factory
 */
angular
  .module('projectaanvraagApp')
  .factory('InsightlyOrganisation', insightlyOrganisationFactory);

/* @ngInject */
function insightlyOrganisationFactory(InsightlyAddress) {

  /**
   * @class InsightlyOrganisation
   * @constructor
   * @param {object}  jsonObject
   */
  var InsightlyOrganisation = function (jsonObject) {
    this.parseJson(jsonObject);
  };

  InsightlyOrganisation.prototype = {

    /**
     * Parse the InsightlyOrganisation based on a parsed json object.
     * @param jsonObject
     */
    parseJson: function (jsonObject) {
      var _self = this;

      _self.id = jsonObject.id;
      _self.name = jsonObject.name;

      _self.addresses = [];
      if (jsonObject.addresses) {
        for (var address in jsonObject.addresses) {
          _self.addresses.push(new InsightlyAddress(jsonObject.addresses[address]));
        }
      }

      _self.customFields = jsonObject.customFields || {};
      _self.links = jsonObject.links || {};
    }
  };

  return (InsightlyOrganisation);
}
