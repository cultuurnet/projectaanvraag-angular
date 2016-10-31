'use strict';

describe('Component: confirmationComponent', function () {

    beforeEach(module('projectaanvraagApp'));

    var confirmationController;

    beforeEach(inject(function (_$componentController_) {
        var bindings = {
            resolve: {
                title: 'title',
                message: 'message'
            }
        }
        confirmationController = _$componentController_('confirmationComponent', {}, bindings);
    }));

    /**
     * Test if the confirmation texts are loaded on the controller.
     */
    it('loads the confirmation text', function () {
        expect(confirmationController.title).toEqual('title');
        expect(confirmationController.message).toEqual('message');
    });

});
