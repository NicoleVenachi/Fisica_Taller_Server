//****import***
const express = require('express');
const router = express.Router();

const response = require('../../network/response.js');

const controller = require('./controller.js')

//***** -Router- para manejar más fácil rutas******

router.get('/', (req,res) =>{
    //busco el user del query
    
    controller.get(req.query.trip_id)
        .then((data) =>{
            response.success(req,res, data,201);
        })
        .catch((err) =>{
            //si hay err, en srver lo digo, al cliente algo gen'erico
            error = err== 'Please, specify trip id' ? err : 'Unexpected Error' 
            // stats = err== 'Especifique el/l@s usuari@(s)' ? res.status : 500
            response.error(req,res, error, 500, err);
        })

});

router.post('/', (req,res) =>{
    controller.post(req.body.route)
        .then((fullMessage)=>{
            //si todo melo, respondo con succes
            response.success(req,res, fullMessage,201);
        })
        .catch((err) =>{
            //si algo sale mal, mando error
            error = err== 'Error: This route have already started' ? err : 'Missing or Invalid information' 
            response.error(req, res, error , 400, 'Error en controlador');
        })
});

router.patch('/', (req,res) =>{
    
    //update rate. Let's use email to identificate the driver
    controller.patch(req.body.route)
        .then((data)=>{
            //si todo melo, respondo la data returned
            response.success(req,res, data,201);
        })
        .catch((error) =>{
            //si sale mal, mando error a server y texto a cliente
            response.error(req, res, "Error interno", 400, error);
        })
});


module.exports = router;