var parse = require('../'),
    expect = require('expect.js');

describe('wellknown', function() {
    describe('primitives', function() {
        it('point', function() {
            expect(parse('POINT (1 1)')).to.eql({
                type: 'Point',
                coordinates: [1, 1]
            });
        });
        it('linestring', function() {
            expect(parse('LINESTRING (30 10, 10 30, 40 40)')).to.eql({
                type: 'LineString',
                coordinates: [[30, 10], [10, 30], [40, 40]]
            });
        });
        it('polygon', function() {
            expect(parse('POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))')).to.eql({
                type: 'Polygon',
                coordinates: [[[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]]
            });
        });
        it('polygon / rings', function() {
            expect(parse('POLYGON ((35 10, 10 20, 15 40, 45 45, 35 10),(20 30, 35 35, 30 20, 20 30))')).to.eql({
                type: 'Polygon',
                coordinates:
                [
                    [
                        [ 35, 10 ],
                        [ 10, 20 ],
                        [ 15, 40 ],
                        [ 45, 45 ],
                        [ 35, 10 ]
                    ], [
                        [ 20, 30 ],
                        [ 35, 35 ],
                        [ 30, 20 ],
                        [ 20, 30 ]
                    ]
                ]
            });
        });
    });
    describe('multipart', function() {
        it('multipoint', function() {
            expect(parse('MULTIPOINT (1 1, 2 3)')).to.eql({
                type: 'MultiPoint',
                coordinates: [[1, 1], [2, 3]]
            });
        });
        it('multilinestring', function() {
            expect(parse('MULTILINESTRING ((30 10, 10 30, 40 40), (30 10, 10 30, 40 40))')).to.eql({
                type: 'MultiLineString',
                coordinates: [
                    [[30, 10], [10, 30], [40, 40]],
                    [[30, 10], [10, 30], [40, 40]]]
            });
        });
        it('multipolygon', function() {
            expect(parse('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))')).to.eql({
                type: 'MultiPolygon',
                coordinates: [
                    [[30, 20], [10, 40], [45, 40], [30, 20]],
                    [[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]

            });
        });
    });

    describe('collection', function() {
        it('geometrycollection', function() {
            expect(parse('GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))')).to.eql({
                type: 'GeometryCollection',
                geometries: [
                    {
                        type: 'Point',
                        coordinates: [4, 6]
                    },
                    {
                        type: 'LineString',
                        coordinates: [[4, 6], [7, 10]]
                    }
                ]
            });
        });
    });
});
