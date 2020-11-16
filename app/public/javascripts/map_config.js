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

var maxAltLayer = {
    'id': 'max-alt',
    'type': 'circle',
    'paint': {
        'circle-color': '#ff0000',
        'circle-radius': 5
    }
};

var flightPathJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': []
            }
        }
    ]
};

var homePathJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': []
            }
        }
    ]
};

var maxAltJSON = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": []
    }
};
