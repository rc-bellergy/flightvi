var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dqmichael/ckfz6df2s0sll1alpfsbqpto8", // stylesheet location
    center: [114.304060, 22.309058], // starting position [lng, lat]
    zoom: 14 // starting zoom
});

map.on("load", function () {

    var socket = io('http://droneserver.zt:3000?user=flightvie');
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
                "lon": 114.2961799999975
            }
        }
        */
        var location = data.drone;
        map.getSource('drone-icon').setData({
            "type": "FeatureCollection",
            "properties": { "title": "drone" },
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [location.lon, location.lat]
                }
            }]
        });

        // Follow the drone, if the map zoom closely
        if (map.getZoom() > 15) {
            map.flyTo({
                center: [location.lon, location.lat]
            });
        }

    });

    // load the drone
    map.loadImage(
        "./images/drone.png",
        function (error, image) {
            if (error) throw error;
            map.addImage("drone-img", image);
            map.addSource("drone-icon", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "properties": { "title": "drone" },
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [114.304060, 22.309058]
                        }
                    }]
                }
            });
            map.addLayer({
                "id": "drone",
                "type": "symbol",
                "source": "drone-icon",
                "layout": {
                    "icon-image": "drone-img",
                    "icon-size": 0.1,
                    "icon-rotate": 270,
                    "icon-allow-overlap": true,
                }
            });
            // console.log(map.getLayer("drones"));
            map.setLayoutProperty("drone", "icon-rotate", 45)
        }
    );

    // Draw line


});
