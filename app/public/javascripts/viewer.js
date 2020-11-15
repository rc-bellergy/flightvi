var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dqmichael/ckfz6df2s0sll1alpfsbqpto8", // stylesheet location
    center: [114.304060, 22.309058], // starting position [lng, lat]
    zoom: 14, // starting zoom
    pitchWithRotate: false,
    dragRotate: false,
    customAttribution: "Developer: bellergy.com",
});

map.on("load", function () {

    var socket = io('http://droneserver.zt:3000?user=flightvie');
    var homeLocation = [114.304060, 22.309058]; //TODO: get it from server
    var geojson = {
        "type": "FeatureCollection",
        "features": [{
            // drone's home location
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": homeLocation
            },
        }, {
            // The strat point of flight path
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': [homeLocation]
            }
        }],
    };

    // load the drone
    map.loadImage(
        "./images/drone.png",
        function (error, image) {
            if (error) throw error;
            map.addImage("drone-img", image);
            map.addSource("drone-icon", {
                "type": "geojson",
                "data": geojson
            });
            map.addLayer({
                "id": "drone",
                "type": "symbol",
                "source": "drone-icon",
                "layout": {
                    "icon-image": "drone-img",
                    "icon-size": 0.1,
                    "icon-rotate": 0,
                    "icon-allow-overlap": true,
                }
            });
            map.addLayer({
                'id': 'flight-path',
                'type': 'line',
                'source': 'drone-icon',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#ed6498',
                    'line-width': 3,
                    'line-opacity': 0.8
                }
            });
        }
    );


    /* Events Handling */
    socket.on('full_rtl_altitude_updated', function (data) {
        // console.log(data);
        /* Sample data
        {
            "max_alt": {
                "alt": 128.8382263183594,
                "let": 22.30485092870576,
                "lon": 114.299852770718,
                "samples": 119
            },
            "drone": {
                "lat": 22.3011780000003,
                "lon": 114.2961799999975,
                "heading": 360
            }
        }
        */

        // update drone's position
        var location = [data.drone.lon, data.drone.lat];
        geojson.features[0].geometry.coordinates = location;
        geojson.features[1].geometry.coordinates.push(location);
        map.getSource('drone-icon').setData(geojson);

        // Update drone's heading
        map.setLayoutProperty('drone', 'icon-rotate', data.drone.heading);

        // Follow the drone, if the map zoom closely
        if (map.getZoom() > 15) {
            map.flyTo({
                center: location
            });
        }

    });


});
