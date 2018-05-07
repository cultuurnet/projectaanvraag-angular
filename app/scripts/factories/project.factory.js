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
function cultuurnetProjectFactory(IntegrationType, ProjectStatuses) {

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
      this.name = jsonObject.name.replace('[TEST] ', '');
      this.userId = jsonObject.userId;
      this.created = jsonObject.created * 1000;
      this.updated = jsonObject.updated * 1000;
      this.testConsumerKey = jsonObject.testConsumerKey || '';
      this.testConsumerSecret = jsonObject.testConsumerSecret || '';
      this.liveConsumerKey = jsonObject.liveConsumerKey || '';
      this.liveConsumerSecret = jsonObject.liveConsumerSecret || '';
      this.testApiKeySapi3 = jsonObject.testApiKeySapi3 || '';
      this.liveApiKeySapi3 = jsonObject.liveApiKeySapi3 || '';
      this.contentFilter = jsonObject.contentFilter || '';
      this.coupon = jsonObject.coupon;
      this.insightlyProjectId = jsonObject.insightlyProjectId;
      this.totalWidgets = jsonObject.totalWidgets || 0;
      this.sapiVersion = jsonObject.sapiVersion || '2';
      this.contentFilter = jsonObject.contentFilter || '';

      if (jsonObject.status && ProjectStatuses[jsonObject.status.toUpperCase()]) {
        jsonObject.status = ProjectStatuses[jsonObject.status.toUpperCase()];
      }
      else {
        jsonObject.status = {};
      }

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
