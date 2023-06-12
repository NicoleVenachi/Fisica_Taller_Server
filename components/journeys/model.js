//*** Import ***
const mongoose = require('mongoose');

//***** Instancio Schema **

//Saco clase schema de mongoose
const Schema = mongoose.Schema;
//instancion schema, defino su estrucura

//I KNOW IT"S not the way time serires should be used
const mySchema = new Schema({
    metadata: {
        trip_id: String,
        position: {
            lat: Number,
            lng: Number
        },
    },
    timestamp: Date,
    
});

// ***** Creo modelo y lo exporto *****
const model = mongoose.model('rt-route',mySchema);

module.exports = model;
