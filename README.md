[![Build Status](https://travis-ci.org/mapbox/wellknown.png)](https://travis-ci.org/mapbox/wellknown)

# wellknown

Parse [Well-Known Text](http://en.wikipedia.org/wiki/Well-known_text) into [GeoJSON](http://www.geojson.org/).

Support

* Point + MultiPoint
* LineString + MultiLineString
* Polygon + MultiPolygon
* GeometryCollection
* 2D, 3D, 4D geometries

## cli

install:

    $ npm install -g wellknown

use:

    $ echo "MultiPoint(0 0, 1 1, 3 3)" | wellknown > multipoint.geojson

## usage

this is a node-style module that works in node.js via npm and in browsers via
[browserify](https://github.com/substack/node-browserify) or a standalone package:

**npm install**:

    npm install wellknown

**standalone**:

    wget https://raw.github.com/mapbox/wellknown/master/wellknown.js

## api

### `parse(wkt)`

Given WKT as a string, return a GeoJSON [geometry object](http://geojson.org/geojson-spec.html#geometry-objects)
or `null` if parse fails.

## example

```js
var parse = require('wellknown');

parse('POINT(1 2)');
```

## See Also

* [wicket](https://github.com/arthur-e/Wicket)

## Rant

The 'WKT Standard' is (mis)managed by the [OGC](http://www.opengeospatial.org/),
and thus is available on page 52 of [this PDF](http://www.opengeospatial.org/standards/sfa).

Given the inaccessibility of the standard, there are no direct reference to it
in this code.
