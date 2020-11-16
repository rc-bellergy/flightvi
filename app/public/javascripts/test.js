var home = [114.304060, 22.309058];
var drone = [114.304060, 22.309058];
var droneHeading = 90;
var _x = 0;
var _y = 0;

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dqmichael/ckfz6df2s0sll1alpfsbqpto8", // stylesheet location
    center: drone,
    zoom: 14, // starting zoom
    pitchWithRotate: false,
    dragRotate: false,
    customAttribution: "Developer: bellergy.com",
});

var maker;

var flightPathJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': [drone]
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
                'coordinates': [home]
            }
        }
    ]
};

function step() {

    // Move marker
    _x += (Math.random() -0.5) / 1000000;
    _y += (Math.random() -0.5) / 1000000;
    // console.log(_x);
    drone = [drone[0] + _x, drone[1] + _y];
    droneHeading += 1;
    marker.setLngLat(drone);
    marker.setRotation(droneHeading);

    // draw flight path
    flightPathJSON.features[0].geometry.coordinates.push(drone);
    map.getSource('flight-path').setData(flightPathJSON);

    // draw home path
    homePathJSON.features[0].geometry.coordinates[1] = drone;
    map.getSource('home-path').setData(homePathJSON);


    
    // loop
    window.requestAnimationFrame(step);
}

map.on("load", function () {

    // create a HTML element of marker
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker
    marker = new mapboxgl.Marker(el)
        .setLngLat(drone)
        .setRotation(droneHeading)
        .addTo(map);

    map.addSource('flight-path', {
        'type': 'geojson',
        'data': flightPathJSON
    });

    map.addSource('home-path', {
        'type': 'geojson',
        'data': homePathJSON
    });

    map.addLayer({
        'id': 'flight-path',
        'type': 'line',
        'source': 'flight-path',
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#4e00ca',
            'line-width': 5,
            'line-opacity': 0.6
        }
    });

    map.addLayer({
        'id': 'home-path',
        'type': 'line',
        'source': 'home-path',
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#ff0000',
            'line-width': 2,
            'line-opacity': 1
        }
    });

    

    // Start animation loop
    window.requestAnimationFrame(step);
});
