var parse = require('../'),
    expect = require('expect.js');

describe('whippit', function() {
    it('parses a basic point', function() {
        expect(parse('POINT (1 1)')).to.eql({
            type: 'Point',
            coordinates: [1, 1]
        });
    });
    it('parses a basic linestring', function() {
        expect(parse('LINESTRING (30 10, 10 30, 40 40)')).to.eql({
            type: 'LineString',
            coordinates: [[30, 10], [10, 30], [40, 40]]
        });
    });
    it('parses a basic polygon', function() {
        expect(parse('POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))')).to.eql({
            type: 'Polygon',
            coordinates: [[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]
        });
    });
    it('parses a basic polygon', function() {
        expect(parse('POLYGON ((35 10, 10 20, 15 40, 45 45, 35 10),(20 30, 35 35, 30 20, 20 30))')).to.eql({
            type: 'Polygon',
            coordinates: [[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]
        });
    });
});
