var parse = require('../'),
    fs = require('fs'),
    fuzzer = require('fuzzer'),
    test = require('tape').test;

test('wellknown', function(t) {
    t.deepEqual(parse('POINT (1 1)'), {
        type: 'Point',
        coordinates: [1, 1]
    });
    t.deepEqual(parse('POINT(1 1)'), {
        type: 'Point',
        coordinates: [1, 1]
    });
    t.deepEqual(parse('POINT\n\r(1 1)'), {
        type: 'Point',
        coordinates: [1, 1]
    });
    t.deepEqual(parse('POINT(1.1 1.1)'), {
        type: 'Point',
        coordinates: [1.1, 1.1]
    });
    t.deepEqual(parse('point(1.1 1.1)'), {
        type: 'Point',
        coordinates: [1.1, 1.1]
    });
    t.deepEqual(parse('point(1 2 3)'), {
        type: 'Point',
        coordinates: [1, 2, 3]
    });
    t.deepEqual(parse('SRID=3857;POINT (1 2 3)'), {
        type: 'Point',
        coordinates: [1, 2, 3],
        crs: {
            type: 'name',
            'properties': {
                name: 'urn:ogc:def:crs:EPSG::3857'
            }
        }
    });
    t.deepEqual(parse('LINESTRING (30 10, 10 30, 40 40)'), {
        type: 'LineString',
        coordinates: [[30, 10], [10, 30], [40, 40]]
    });
    t.deepEqual(parse('LINESTRING(30 10, 10 30, 40 40)'), {
        type: 'LineString',
        coordinates: [[30, 10], [10, 30], [40, 40]]
    });
    t.deepEqual(parse('LineString(30 10, 10 30, 40 40)'), {
        type: 'LineString',
        coordinates: [[30, 10], [10, 30], [40, 40]]
    });
    t.deepEqual(parse('LINESTRING (1 2 3, 4 5 6)'), {
        type: 'LineString',
        coordinates: [[1, 2, 3], [4, 5, 6]]
    });
    t.deepEqual(parse('SRID=3857;LINESTRING (30 10, 10 30, 40 40)'), {
        type: 'LineString',
        coordinates: [[30, 10], [10, 30], [40, 40]],
        crs: {
            type: 'name',
            'properties': {
                name: 'urn:ogc:def:crs:EPSG::3857'
            }
        }
    });
    t.deepEqual(parse('POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))'), {
        type: 'Polygon',
        coordinates: [[[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]]
    });
    t.deepEqual(parse('POLYGON((30 10, 10 20, 20 40, 40 40, 30 10))'), {
        type: 'Polygon',
        coordinates: [[[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]]
    });
    t.deepEqual(parse('SRID=3857;POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))'), {
        type: 'Polygon',
        coordinates: [[[30, 10], [10, 20], [20, 40], [40, 40], [30, 10]]],
        crs: {
            type: 'name',
            'properties': {
                name: 'urn:ogc:def:crs:EPSG::3857'
            }
        }
    });
    t.deepEqual(parse('POLYGON ((35 10, 10 20, 15 40, 45 45, 35 10),(20 30, 35 35, 30 20, 20 30))'), {
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
    t.deepEqual(parse('MULTIPOINT (1 1, 2 3)'), {
        type: 'MultiPoint',
        coordinates: [[1, 1], [2, 3]]
    });
    t.deepEqual(parse('MultiPoint (1 1, 2 3)'), {
        type: 'MultiPoint',
        coordinates: [[1, 1], [2, 3]]
    });
    t.deepEqual(parse('SRID=3857;MULTIPOINT (1 1, 2 3)'), {
        type: 'MultiPoint',
        coordinates: [[1, 1], [2, 3]],
        crs: {
            type: 'name',
            'properties': {
                name: 'urn:ogc:def:crs:EPSG::3857'
            }
        }
    });
    t.deepEqual(parse('MULTILINESTRING ((30 10, 10 30, 40 40), (30 10, 10 30, 40 40))'), {
        type: 'MultiLineString',
        coordinates: [
            [[30, 10], [10, 30], [40, 40]],
            [[30, 10], [10, 30], [40, 40]]]
    });
    t.deepEqual(parse('SRID=3857;MULTILINESTRING ((30 10, 10 30, 40 40), (30 10, 10 30, 40 40))'), {
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
    t.deepEqual(parse('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))'), {
        type: 'MultiPolygon',
        coordinates: [
            [[[30, 20], [10, 40], [45, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]]
    });
    t.deepEqual(parse('MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5), (10 10, 15 10, 15 15, 10 10)))'), {
        type: 'MultiPolygon',
        coordinates: [
            [[[30, 20], [10, 40], [45, 40], [30, 20]]],
            [
                [[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]],
                [[10, 10], [15, 10], [15, 15], [10, 10]]]]
    });
    t.deepEqual(parse('SRID=3857;MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))'), {
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
    t.deepEqual(parse(fs.readFileSync('test/data/geometrycollection.wkt', 'utf8')),
                JSON.parse(fs.readFileSync('test/data/geometrycollection.geojson')));
    t.deepEqual(parse('GeometryCollection(POINT(4 6),LINESTRING(4 6,7 10))'), {
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
    t.deepEqual(parse('GeometryCollection(POINT(4 6),\nLINESTRING(4 6,7 10))'), {
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

    t.end();
});

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
