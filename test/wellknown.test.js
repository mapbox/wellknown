var parse = require('../'),
    fs = require('fs'),
    expect = require('expect.js');

describe('wellknown', function() {
    describe('primitives', function() {
        it('point', function() {
            expect(parse('POINT (1 1)')).to.eql({
                type: 'Point',
                coordinates: [1, 1]
            });
            expect(parse('POINT(1 1)')).to.eql({
                type: 'Point',
                coordinates: [1, 1]
            });
            expect(parse('POINT\n\r(1 1)')).to.eql({
                type: 'Point',
                coordinates: [1, 1]
            });
            expect(parse('POINT(1.1 1.1)')).to.eql({
                type: 'Point',
                coordinates: [1.1, 1.1]
            });
            expect(parse('point(1.1 1.1)')).to.eql({
                type: 'Point',
                coordinates: [1.1, 1.1]
            });
            expect(parse('point(1 2 3)')).to.eql({
                type: 'Point',
                coordinates: [1, 2, 3]
            });
            expect(parse('SRID=3857;POINT (1 2 3)')).to.eql({
                type: 'Point',
                coordinates: [1, 2, 3],
                crs: {
                    type: 'name',
                    'properties': {
                        name: 'urn:ogc:def:crs:EPSG::3857'
                    }
                }
            });
        });
        it('linestring', function() {
            expect(parse('LINESTRING (30 10, 10 30, 40 40)')).to.eql({
                type: 'LineString',
                coordinates: [[30, 10], [10, 30], [40, 40]]
            });
            expect(parse('LINESTRING(30 10, 10 30, 40 40)')).to.eql({
                type: 'LineString',
                coordinates: [[30, 10], [10, 30], [40, 40]]
            });
            expect(parse('LineString(30 10, 10 30, 40 40)')).to.eql({
                type: 'LineString',
                coordinates: [[30, 10], [10, 30], [40, 40]]
            });
            expect(parse('LINESTRING (1 2 3, 4 5 6)')).to.eql({
                type: 'LineString',
                coordinates: [[1, 2, 3], [4, 5, 6]]
            });
            expect(parse('SRID=3857;LINESTRING (30 10, 10 30, 40 40)')).to.eql({
                type: 'LineString',
                coordinates: [[30, 10], [10, 30], [40, 40]],
                crs: {
                    type: 'name',
                    'properties': {
                        name: 'urn:ogc:def:crs:EPSG::3857'
                    }
                }
            });
        });
        it('polygon', function() {
            expect(parse('POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))')).to.eql({
                type: 'Polygon',
                coordinates: [[[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]]
            });
            expect(parse('POLYGON((30 10, 10 20, 20 40, 40 40, 30 10))')).to.eql({
                type: 'Polygon',
                coordinates: [[[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]]
            });
            expect(parse('SRID=3857;POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))')).to.eql({
                type: 'Polygon',
                coordinates: [[[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]],
                crs: {
                    type: 'name',
                    'properties': {
                        name: 'urn:ogc:def:crs:EPSG::3857'
                    }
                }
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
            expect(parse('MultiPoint (1 1, 2 3)')).to.eql({
                type: 'MultiPoint',
                coordinates: [[1, 1], [2, 3]]
            });
            expect(parse('SRID=3857;MULTIPOINT (1 1, 2 3)')).to.eql({
                type: 'MultiPoint',
                coordinates: [[1, 1], [2, 3]],
                crs: {
                    type: 'name',
                    'properties': {
                        name: 'urn:ogc:def:crs:EPSG::3857'
                    }
                }
            });
        });
        it('multilinestring', function() {
            expect(parse('MULTILINESTRING ((30 10, 10 30, 40 40), (30 10, 10 30, 40 40))')).to.eql({
                type: 'MultiLineString',
                coordinates: [
                    [[30, 10], [10, 30], [40, 40]],
                    [[30, 10], [10, 30], [40, 40]]]
            });
            expect(parse('SRID=3857;MULTILINESTRING ((30 10, 10 30, 40 40), (30 10, 10 30, 40 40))')).to.eql({
                type: 'MultiLineString',
                coordinates: [
                    [[30, 10], [10, 30], [40, 40]],
                    [[30, 10], [10, 30], [40, 40]]],
                crs: {
                    type: 'name',
                    'properties': {
                        name: 'urn:ogc:def:crs:EPSG::3857'
                    }
                }
            });
        });
        it('multipolygon', function() {
            expect(parse('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))')).to.eql({
                type: 'MultiPolygon',
                coordinates: [
                    [[[30, 20], [10, 40], [45, 40], [30, 20]]],
                    [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]]
            });
            expect(parse('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5), (10 10, 15 10, 15 15, 10 10)))')).to.eql({
                type: 'MultiPolygon',
                coordinates: [
                    [[[30, 20], [10, 40], [45, 40], [30, 20]]],
                    [
                        [[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]],
                        [[10, 10], [15, 10], [15, 15], [10, 10]]]]
            });
            expect(parse('SRID=3857;MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))')).to.eql({
                type: 'MultiPolygon',
                coordinates: [
                    [[[30, 20], [10, 40], [45, 40], [30, 20]]],
                    [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]],
                crs: {
                    type: 'name',
                    'properties': {
                        name: 'urn:ogc:def:crs:EPSG::3857'
                    }
                }
            });
        });
    });

    function file(_) {
        return fs.readFileSync('test/data/' + _, 'utf8');
    }

    function fileJSON(_) {
        return JSON.parse(fs.readFileSync('test/data/' + _, 'utf8'));
    }

    describe('collection', function() {
        it('advanced', function() {
            expect(parse(file('geometrycollection.wkt'))).to.eql(fileJSON('geometrycollection.geojson'));
        });
        it('geometrycollection', function() {
            expect(parse('GeometryCollection(POINT(4 6),LINESTRING(4 6,7 10))')).to.eql({
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
            expect(parse('GeometryCollection(POINT(4 6),\nLINESTRING(4 6,7 10))')).to.eql({
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
