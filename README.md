# Flightvi

## What is Flightvi?
It connects [droneserver](https://github.com/rc-bellergy/droneserver), displays the live information of the flying drone using mapbox.


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
