var flightPathLayer = {
    'id': 'flight-path',
    'type': 'line',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
    },
    'paint': {
        'line-color': '#4e00ca',
        'line-width': 5,
        'line-opacity': 0.6
    }
};

var homePathLayer = {
    'id': 'home-path',
    'type': 'line',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
    },
    'paint': {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 1
    }
};

var maxAltLabelLayer = {
    'id': 'max-alt-label',
    'type': 'symbol',
    'layout': {
        'text-field': ['get', 'description'],
        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
        'text-radial-offset': 0.5,
        'text-justify': 'auto',
        'icon-image': ['concat', ['get', 'icon'], '-15']
    }
}

var flightPathJSON = {
    'type': 'Feature',
    'geometry': {
        'type': 'LineString',
        'coordinates': []
    }
};

var homePathJSON = {
    'type': 'Feature',
    'geometry': {
        'type': 'LineString',
        'coordinates': []
    }
};

var maxAltJSON = {
    'type': 'Feature',
    'properties': {
        'description': '',
        'icon': 'campsite'
    },
    'geometry': {
        'type': 'Point',
        'coordinates': []
    }
}
