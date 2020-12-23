# Flightvi

## What is Flightvi?
It connects the `droneserver` and displays the real time information of the flying drone using the Mapbox.
You need to setup your [droneserver](https://github.com/rc-bellergy/droneserver) first.

## Install
    cd app
    npm install
    cp public/javascripts/config_example.js public/javascripts/config.js

## Get Mapbox Token
https://account.mapbox.com/access-tokens/
Add the token to `config.js`

## Start
    cd app
    DEBUG=myapp:* npm start
    http://localhost:3000

## Start the SITL and Mavlink router
    ssh droneserver.zt
    cd ~/px4/Firmware
    export PX4_HOME_LAT=22.3090520
    export PX4_HOME_LON=114.3041529
    HEADLESS=1 make px4_sitl gazebo

    mavlink-routerd -e 192.168.192.101:14551 127.0.0.1:14550