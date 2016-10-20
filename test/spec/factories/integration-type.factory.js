'use strict';

describe('Service: projectaanvraagApiService', function () {

    var apiUrl = 'http://example.com/';

    beforeEach(module('projectaanvraagApp', function($provide) {
        $provide.constant('appConfig', {
            apiUrl: apiUrl
        });
    }));

    var IntegrationType;

    beforeEach(inject(function (_IntegrationType_) {
        IntegrationType = _IntegrationType_;
    }));

    /**
     * Check if it the type gets parsed.
     */
    it('requests the integration types', function () {

        var response = readJSON('test/json/integration_types.json');
        var integrationType = new IntegrationType(response.widgets);

        expect(integrationType.id).toEqual('widgets');
        expect(integrationType.name).toEqual('Widgets');
        expect(integrationType.description).toEqual('Kant en klare html-modules die je in je website kan inpassen');
        expect(integrationType.price).toEqual(110);
        expect(integrationType.url).toEqual('http://www.test.com');
        expect(integrationType.extraInfo).toEqual([
            'HTML, CSS, JS',
            'Geschikt voor basisoplossingen'
        ]);
        expect(integrationType.groupId).toEqual('group_id');
    });
});
