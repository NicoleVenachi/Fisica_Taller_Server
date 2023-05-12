//****import***
const express = require('express');

const user = require('../components/user/network.js')

//Creo función que añada todas las rutas

const routes = (server) => {
    //la ruta la manejo con el router del componente
    //aquí ya paso la ruta, no la necesito poner en network.js
    server.use('/user', user);
}

module.exports = routes;