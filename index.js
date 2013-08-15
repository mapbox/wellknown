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

    function multicoords() {
        $(/\s*/);
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
            }
        }
        if (depth !== 0) return null;
        return rings[0];
    }

    function coords() {
        var list = [], item, pt;
        while (pt =
            $(/^[-+]?([0-9]*\.[0-9]+|[0-9]+)/) ||
            $(/(\,)/)) {
            if (pt == ',') {
                list.push(item);
                item = [];
            } else {
                if (!item) item = [];
                item.push(parseFloat(pt));
            }
            $(/(\s*)/);
        }
        if (item) list.push(item);
        return list.length ? list : null;
    }

    function point() {
        if (!$(/^(POINT)/)) return null;
        $(/\s*/);
        if (!$(/^(\()/)) return null;
        var c = coords();
        $(/\s*/);
        if (!$(/^(\))/)) return null;
        return {
            type: 'Point',
            coordinates: c[0]
        };
    }

    function linestring() {
        if (!$(/^(LINESTRING*)/)) return null;
        $(/\s*/);
        if (!$(/^(\()/)) return null;
        var c = coords();
        if (!$(/^(\))/)) return null;
        return {
            type: 'LineString',
            coordinates: c
        };
    }

    function polygon() {
        if (!$(/^(POLYGON*)/)) return null;
        $(/\s*/);
        var c = multicoords();
        return {
            type: 'Polygon',
            coordinates: c
        };
    }

    var geometry = point() || linestring() || polygon();
    return geometry;
}
