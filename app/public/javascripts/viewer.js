var home = [114.304060, 22.309058]; //TODO: get it from server
var drone = home;
var droneHeading = 0;
var maker; // drone icon

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dqmichael/ckfz6df2s0sll1alpfsbqpto8", // stylesheet location
    center: home, //  [lng, lat]
    zoom: 14, // starting zoom
    pitchWithRotate: false,
    dragRotate: false,
    customAttribution: "Developer: bellergy.com",
});

map.on("load", function () {

    var socket = io('http://droneserver.zt:3000?user=flightvie');

    // create a HTML element of marker
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker
    marker = new mapboxgl.Marker(el)
        .setLngLat(drone)
        .setRotation(droneHeading)
        .addTo(map);

    // flight path
    flightPathJSON.geometry.coordinates.push(drone);
    map.addSource('flight-path', {
        'type': 'geojson',
        'data': flightPathJSON
    });
    flightPathLayer.source = 'flight-path';
    map.addLayer(flightPathLayer);
    
    // RTL path
    homePathJSON.geometry.coordinates.push(home);
    map.addSource('home-path', {
        'type': 'geojson',
        'data': homePathJSON
    });
    homePathLayer.source = 'home-path';
    map.addLayer(homePathLayer);

    // Max alt point
    map.addSource('max-alt-point', {
        'type': 'geojson',
        'data': maxAltJSON
    });
    maxAltLabelLayer.source = 'max-alt-point';
    map.addLayer(maxAltLabelLayer);

    /* Events Handling */
    socket.on('full_rtl_altitude_updated', function (data) {

        drone = [data.drone.lon, data.drone.lat];
        droneHeading = data.drone.heading;

        // update drone location
        marker.setLngLat(drone);
        marker.setRotation(droneHeading);

        // draw flight path
        flightPathJSON.geometry.coordinates.push(drone);
        map.getSource('flight-path').setData(flightPathJSON);

        // update home path
        homePathJSON.geometry.coordinates[1] = drone;
        map.getSource('home-path').setData(homePathJSON);

        // update max alt location
        maxAltJSON.geometry.coordinates = [data.max_alt.lon, data.max_alt.let];
        maxAltJSON.properties.description = data.max_alt.alt.toFixed(1)+"M";
        map.getSource('max-alt-point').setData(maxAltJSON);


        // Follow the drone, if the map zoom closely
        if (map.getZoom() > 15) {
            map.flyTo({
                center: drone
            });
        }

    });

});
