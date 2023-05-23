//****import***
const express = require('express');

const users = require('../components/users/network.js')
//const trips = require('../components/trips/network.js')
//Creo función que añada todas las rutas

const routes = (server) => {
    //la ruta la manejo con el router del componente
    //aquí ya paso la ruta, no la necesito poner en network.js
    server.use('/users', users);
    // server.use('/trips', trips);
}

module.exports = routes;