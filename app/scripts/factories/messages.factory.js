'use strict';

/**
 * @ngdoc service
 * @name projectaanvraagApp.Messages
 * @description
 * # Messages factory
 */
angular
  .module('projectaanvraagApp')
  .factory('Messages', messagesFactory);

/* @ngInject */
function messagesFactory($rootScope) {

  /**
   * @class Messages
   * @constructor
   */
  var Messages = function () {
    this.messages = {};
  };

  Messages.prototype = {

    /**
     * Clears the messages array
     */
    clearMessages: function () {
      this.messages = {};
    },

    /**
     * Parse the integration type based on a parsed json object.
     * @param type
     * @param message
     */
    addMessage: function (type, message) {
      if (!(type in this.messages)) {
        this.messages[type] = [];
      }

      if(this.messages[type].indexOf(message) == -1) {
        this.messages[type].push(message);
      }
    }
  };

  return new Messages();
}
