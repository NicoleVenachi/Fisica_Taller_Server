// ***** import***
const db = require('mongoose');
const Model = require('./model.js');
const { response } = require('express');

//****** Conecto */
db.Promise = global.Promise;

db.set('strictQuery', true);
db.connect('mongodb+srv://db_user_test:db_user_test@cluster0.kfx9dm4.mongodb.net/taller_DB?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    keepAlive: true,
    useUnifiedTopology:true
})
    .then(() => console.log('[db] Conectada con éxito'))
    .catch(err => console.error('[db]', err))


// mongodb+srv://db_user_test:<password>@cluster0.kfx9dm4.mongodb.net/DBName?retryWrites=true&w=majority

//********* CRUD  */

//leer info de user con su name
async function get(filterUser) {

    //creo un filtro vcío
    let filter ={};

    //si hay filtro, lo pongo
    if (filterUser != null){
        filter = {user: filterUser};
    }
    else {}

    //traigo TODOS los msgs con ese filtro
    //si filtro está vació, tra todo
    const mesaggess = await Model.find(filter);
    return mesaggess;

    // conviero lada data del filtro en array
    let users = typeof filterUser == 'object' ? 
        filterUser : [filterUser]

    let data = []
    //por cada usuario hago el findOne
    for (const user of users) {
        let filter = {email: user}

        data.push(await Model.findOne(filter));
    }
    
    return data;
}

//crear usuario mensaje
function post(trip) {
    //Insantacion mensaje como clase del modelo
    const myTrip = new Model(trip);
    
    //Write:
    myTrip.save();
}



async function patch(id, user) {
    
    //busco el trip
    const trip = await Model.findOne({
        _id: id
    });

    if (!trip) {
        return "Trip id doesn't exist on the DB"
    }

    //actualizo el numero de puestos usados, verificando que no supere a los dispoibles
    usedSeats = trip.carInfo.usedSeats +1
    if (usedSeats > trip.carInfo.availableSeats){
        return "This trip is already full"
    }

    //me aseguro que el pasajero no exista ya en ese trip
    p_exists = false
    trip.passengers.map(passenger => {
        if(passenger.email == user.email){
            p_exists = true
        }
    })

    if (p_exists) {
        return "You've been alreaday added to this trip before"
    }
    //actualizo
    fare = trip.totalPrice /(usedSeats+1) //
    userInfo = {
        "name": user.name,
        "email": user.email,
        "fare": fare
    }

    trip.carInfo.usedSeats = usedSeats;
    trip.passengers.push(userInfo)

    //ademas, todos los usuarios les tengo que cambiar el precio
    driverProfits = 0
    passengers_backup = []
    trip.passengers.forEach((passenger,idx) => {
        new_passenger = passenger
        new_passenger.fare = fare
        passengers_backup.push(new_passenger)
        driverProfits += fare
    })
    console.log(trip);

    trip.driver.profits = driverProfits
    
    console.log(passengers_backup);

    trip.passengers = []
    //await trip_copy.save()
    //save
    await trip.save()

    trip.passengers = passengers_backup
    await trip.save()

    return "You've been succesfully added to this trip!";
}

module.exports = {
    get,
    post,
    patch
}

