module.exports = parse;

// https://gist.github.com/ammojamo/1048372
function parse(_) {

    var i = 0;

    function $(re) {
        var match = _.substring(i).match(re);
        if (!match) return null;
        else {
            i += match[0].length;
            return match[0];
        }
    }

    function white() { $(/^\s*/); }

    function multicoords() {
        white();
        var depth = 0, rings = [],
            pointer = rings, elem;
        while (elem =
            $(/^(\()/) ||
            $(/^(\))/) ||
            $(/^(\,)/) ||
            coords()) {
            if (elem == '(') {
                depth++;
            } else if (elem == ')') {
                depth--;
            } else if (elem && Array.isArray(elem) && elem.length) {
                pointer.push(elem);
            } else if (elem === ',') {
            }
            white();
        }
        if (depth !== 0) return null;
        return rings;
    }

    function coords() {
        var list = [], item, pt;
        while (pt =
            $(/^[-+]?([0-9]*\.[0-9]+|[0-9]+)/) ||
            $(/^(\,)/)) {
            if (pt == ',') {
                list.push(item);
                item = [];
            } else {
                if (!item) item = [];
                item.push(parseFloat(pt));
            }
            white();
        }
        if (item) list.push(item);
        return list.length ? list : null;
    }

    function point() {
        if (!$(/^(POINT)/)) return null;
        white();
        if (!$(/^(\()/)) return null;
        var c = coords();
        white();
        if (!$(/^(\))/)) return null;
        return {
            type: 'Point',
            coordinates: c[0]
        };
    }

    function multipoint() {
        if (!$(/^(MULTIPOINT)/)) return null;
        white();
        var c = multicoords();
        white();
        return {
            type: 'MultiPoint',
            coordinates: c[0]
        };
    }

    function multilinestring() {
        if (!$(/^(MULTILINESTRING)/)) return null;
        white();
        var c = multicoords();
        white();
        return {
            type: 'MultiLineString',
            coordinates: c
        };
    }

    function linestring() {
        if (!$(/^(LINESTRING)/)) return null;
        white();
        if (!$(/^(\()/)) return null;
        var c = coords();
        if (!$(/^(\))/)) return null;
        return {
            type: 'LineString',
            coordinates: c
        };
    }

    function polygon() {
        if (!$(/^(POLYGON)/)) return null;
        white();
        return {
            type: 'Polygon',
            coordinates: multicoords()
        };
    }

    function multipolygon() {
        if (!$(/^(MULTIPOLYGON)/)) return null;
        white();
        return {
            type: 'MultiPolygon',
            coordinates: multicoords()
        };
    }

    function geometrycollection() {
        var geometries = [], geometry;

        if (!$(/^(GEOMETRYCOLLECTION)/)) return null;
        white();

        if (!$(/^(\()/)) return null;
        while (geometry = root()) {
            geometries.push(geometry);
            $(/^(\,)/);
        }
        if (!$(/^(\))/)) return null;

        return {
            type: 'GeometryCollection',
            geometries: geometries
        };
    }

    function root() {
        return point() || linestring() || polygon() ||
            multipoint() || multilinestring() || multipolygon() || geometrycollection();
    }

    return root();
}
