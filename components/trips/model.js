//*** Import ***
const mongoose = require('mongoose');

//***** Instancio Schema **

//Saco clase schema de mongoose
const Schema = mongoose.Schema;
//instancion schema, defino su estrucura
const mySchema = new Schema({
    driver: {
        name: String,
        profits: String
    },
    carInfo: {
        plate: String,
        seats: Number,
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
    status: Boolean,
    finished: Boolean,
});

// ***** Creo modelo y lo exporto *****
const model = mongoose.model('trips',mySchema);

module.exports = model;