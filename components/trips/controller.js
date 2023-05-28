//****imports
const store = require('./store.js')


//para leer info del trip by user
function get_by_user(user){
    //paso al listar, el filtro
    return new Promise((resolve, reject) => {
        try {
            user == undefined ? 
                reject('Please, specify the user to get'):
                resolve(store.get_by_user(user))
        } catch (error) {
            reject(error)
        }
    })
}
//para leer info del trip by destination
function get_by_destination(destination){
    //paso al listar, el filtro
    return new Promise((resolve, reject) => {
        try {
            destination == undefined ? 
                reject('Please, specify the destination to get'):
                resolve(store.get_by_destination(destination))
        } catch (error) {
            reject(error)
        }
    })
}


// Para crear  trip
function post(trip, driver, totalPrice, availableSeats, date) {

    return new Promise ((resolve, reject) =>{
        // -VALIDACIÓN- sino hay info, no lo añade

        if (!trip || !driver || !totalPrice) {
            //log para mi en server
            console.error('[messageController] No hay trip');
            reject('Missing data');
            return false; // acabo ejecución
        }
        
        if ((availableSeats > driver.carInfo.seats) || (availableSeats < 0 )) {
            console.error('[messageController] available seats fuera de rango');
            reject('The specified number of available seats exceeds those allowed for this car');
            return false
        }
        
        //conformo la data y lo creo
        trip.driver = {
            name: driver.name,
            email: driver.email,
            rate: driver.rate.rateMean,
            profits: 0
        }
        trip.carInfo  = {
            plate: driver.carInfo.plate,
            seats: driver.carInfo.seats,
            availableSeats: availableSeats,
            usedSeats: 0
        }
        trip.passengers = []
        trip.started = false
        trip.finished = false
        trip.totalPrice = totalPrice
        trip.date = new Date(date)

        store.post(trip);
        resolve('Trip created')
        

    });
    
}

// Para actualizar el trip con nuevos pasajeros
async function patch(id, user) {
    
    return new Promise (async (resolve, reject) =>{
        // -VALIDACIÓN- sino hay info, no lo añade
        if (!id || !user) {
            //log para mi en server
            console.error('[messageController] No hay info a actualizar o están malos los datos');
            reject('Mising data');
            return false; // acabo ejecución
        }
        
        const result = await store.patch(id, user);
        resolve(result)
    });
    
}

module.exports = {
    get_by_user,
    get_by_destination,
    post,
    patch
}

