//*** Import ***
const mongoose = require('mongoose');

//***** Instancio Schema **

//Saco clase schema de mongoose
const Schema = mongoose.Schema;
//instancion schema, defino su estrucura
const mySchema = new Schema({
    driver: {
        name: String,
        rate: Number,
        profits: String,
    },
    carInfo: {
        plate: String,
        availableSeats: Number,
        usedSeats: Number
    },
    pickUpPoint: {
        lat: Number,
        lng: Number
    },
    destination: {
        lat: Number,
        lng: Number
    },
    passengers: Array,
    date: Date,
    totalPrice: Number,
    started: Boolean,
    finished: Boolean,
});

// ***** Creo modelo y lo exporto *****
const model = mongoose.model('trips',mySchema);

module.exports = model;
