'use strict';

/**
 * @ngdoc service
 * @name projectaanvraagApp.InsightlyContactInfo
 * @description
 * # InsightlyContactInfo factory
 */
angular
  .module('projectaanvraagApp')
  .factory('InsightlyContactInfo', insightlyContactInfoFactory);

/* @ngInject */
function insightlyContactInfoFactory() {

  /**
   * @class InsightlyContactInfo
   * @constructor
   * @param {object}  jsonObject
   */
  var InsightlyContactInfo = function (jsonObject) {
    this.parseJson(jsonObject);
  };

  InsightlyContactInfo.prototype = {

    /**
     * Parse the insightly contact info based on a parsed json object.
     * @param jsonObject
     */
    parseJson: function (jsonObject) {
      this.id = jsonObject.id;
      this.type = jsonObject.type;
      this.label = jsonObject.label;
      this.detail = jsonObject.detail;
    }
  };

  return (InsightlyContactInfo);
}
