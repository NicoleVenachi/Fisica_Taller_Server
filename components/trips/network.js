//****import***
const express = require('express');
const router = express.Router();

const response = require('../../network/response.js');

const controller = require('./controller.js');
const { error } = require('../../network/response.js');

//***** -Router- para manejar más fácil rutas******

router.get('/', (req,res) =>{
    //busco el user del query
    if(!!req.query.email & !!req.query.type){

        const user= {
            email: req.query.email,
            type: req.query.type
        }
        controller.get_by_user(user)
            .then((data) =>{
                response.success(req,res, data,201);
            })
            .catch((err) =>{
                //si hay err, en srver lo digo, al cliente algo gen'erico
                response.error(req,res, error, 500, err);
            })
    }
    else if (!!req.query.nickName) {
        destination = {
            nickName: req.query.nickName
        }
        controller.get_by_destination(destination)
            .then((data) =>{
                response.success(req,res, data,201);
            })
            .catch((err) =>{
                //si hay err, en srver lo digo, al cliente algo gen'erico
                response.error(req,res, error, 500, err);
            })
    }
    else if (!!req.query._id) {
        controller.get_by_id(req.query._id)
            .then((data) =>{
                response.success(req,res, data,201);
            })
            .catch((err) =>{
                //si hay err, en srver lo digo, al cliente algo gen'erico
                response.error(req,res, error, 500, err);
            })
    }
    else{
        const error= "Please, specify the user or the destination's nick name to get"
        response.error(req, res, error, 400, error)
    }
    
});

router.post('/', (req,res) =>{
    controller.post(req.body.trip, req.body.driver, req.body.totalPrice, req.body.availableSeats, req.body.date)
        .then((fullMessage)=>{
            //si todo melo, respondo con succes
            response.success(req,res, fullMessage,201);
        })
        .catch((err) =>{
            err_1 = 'The specified number of available seats exceeds those allowed for this car'
            console.log(err);
            //si algo sale mal, mando error
            error = (err== err_1) ? err : 'Missing or Invalid information' 
            response.error(req, res, error , 400, 'Error en controlador');
        })
});

router.patch('/', (req,res) =>{
    
    if (!!req.body._id & !!req.body.user){
        controller.patch(req.body._id, req.body.user)
        .then((data)=>{
            response.success(req,res, data,201);
        })
        .catch((err) =>{
            console.log(err);
            response.error(req, res, "Error interno", 400, err);
        })
    }
    else if (!!req.body._id & (!!req.body.started || !!req.body.finished)) {
        controller.patch_status(req.body._id, req.body.started, req.body.finished)
        .then((data)=>{
            response.success(req,res, data,201);
        })
        .catch((err) =>{
            console.log(err);
            response.error(req, res, "Miising or invalid information", 400, err);
        })
    }
    else{
        const error= "Missing or invalid information"
        response.error(req, res, error, 400, error)
    }
    
});



module.exports = router;