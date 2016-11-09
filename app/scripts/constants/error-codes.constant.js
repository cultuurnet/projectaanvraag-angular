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
    .constant('apiErrorCodes',
        /**
         * Enum for error codes + readable error.
         * @readonly
         * @enum {string}
         */
        {
            'COUPON_ALREADY_USED': {
                label: 'De ingevoerde coupon is reeds in gebruik.',
            },
            'INVALID_COUPON': {
                label: 'De ingevoerde coupon is niet geldig.',
            }
        });
