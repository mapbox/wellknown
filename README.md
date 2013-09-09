[![Build Status](https://travis-ci.org/mapbox/wellknown.png)](https://travis-ci.org/mapbox/wellknown)

# wellknown

Parse [Well-Known Text](http://en.wikipedia.org/wiki/Well-known_text) into [GeoJSON](http://www.geojson.org/).

## api

### `parse(wkt)`

Given WKT as a string, return a GeoJSON [geometry object](http://geojson.org/geojson-spec.html#geometry-objects)
or `null` if parse fails.

## example

```js
var parse = require('wellknown');

parse('POINT(1 2)');
```
