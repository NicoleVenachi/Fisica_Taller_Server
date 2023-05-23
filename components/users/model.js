//*** Import ***
const mongoose = require('mongoose');

//***** Instancio Schema **

//Saco clase schema de mongoose
const Schema = mongoose.Schema;
//instancion schema, defino su estrucura
const mySchema = new Schema({
    name: String,
    password: String,
    email: String,
    type: String,
    carInfo: {
        plate: String,
        seats: Number,
    } || {},
    rate: {
        rateSum: Number || Boolean,
        rateMean: Number || Boolean,
        totalRates: Number || Boolean,
    } || {}
});

// ***** Creo modelo y lo exporto *****
const model = mongoose.model('users',mySchema);

module.exports = model;
