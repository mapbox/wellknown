var wellknown = require('../'),
    fs = require('fs'),
    fuzzer = require('fuzzer'),
    test = require('tape').test;

test('wellknown', function(t) {
    t.equal(wellknown.stringify(wellknown('POINT (1 1)'), {
        type: 'Point',
        coordinates: [1, 1]
    }), 'POINT (1 1)');

    t.throws(function() {
        wellknown.stringify({
            type: 'FeatureCollection'
        });
    }, 'does not accept featurecollections');
    t.end();
});
