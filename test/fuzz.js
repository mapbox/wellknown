var parse = require('../'),
    fuzzer = require('fuzzer'),
    test = require('tape').test;

test('fuzz', function(t) {
    fuzzer.seed(0);
    var inputs = [
        'MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))',
        'POINT(1.1 1.1)',
        'LINESTRING (30 10, 10 30, 40 40)',
        'GeometryCollection(POINT(4 6),\nLINESTRING(4 6,7 10))'];
    inputs.forEach(function(str) {
        for (var i = 0; i < 10000; i++) {
            try {
                var input = fuzzer.mutate.string(str);
                parse(input);
            } catch(e) {
                t.fail('could not parse ' + input + ', exception ' + e + '\n' + e.stack);
            }
        }
    });
    t.end();
});
