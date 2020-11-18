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
