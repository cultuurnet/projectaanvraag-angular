'use strict';

/**
 * @ngdoc constant
 * @name projectaanvraagApp.constant:ProjectStatuses
 * @description
 * # ProjectStatuses
 * the possible project statuses
 */
angular
    .module('projectaanvraagApp')
    .constant('ProjectStatuses',
        /**
         * Enum for project statuses
         * @readonly
         * @enum {string}
         */
        {
            'APPLICATION_SENT': {
                label: 'Niet actief',
                code: 'application_sent',
                class: 'state-inactive'
            },
            'WAITING_FOR_PAYMENT': {
                label: 'In aanvraag',
                code: 'waiting_for_payment',
                class: 'state-inprogress',
            },
            'ACTIVE': {
                label: 'Actief',
                code: 'active',
                class: 'state-active',
            }
        });
