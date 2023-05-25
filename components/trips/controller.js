//****imports
const store = require('./store.js')


//para leer info de User
function get(filterUser){
    //paso al listar, el filtro
    return new Promise((resolve, reject) => {
        try {
            filterUser == undefined ? 
                reject('Please, specify users to get'):
                resolve(store.get(filterUser))
        } catch (error) {
            reject(error)
        }
    })
}

// Para crear  trip
function post(trip, driver, price, availableSeats, date) {

    return new Promise ((resolve, reject) =>{
        // -VALIDACIÓN- sino hay info, no lo añade

        if (!trip || !driver || !price) {
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
            rateMean: driver.rateMean,
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
        trip.date = new Date(date)

        store.post(trip);
        resolve('Trip created')
        

    });
    
}

// Para actualizar el rate al driver
async function patch(email, newRate) {
    
    return new Promise (async (resolve, reject) =>{
        // -VALIDACIÓN- sino hay info, no lo añade
        if (!email || !newRate  || !(newRate>=0 & newRate<=5)) {
            //log para mi en server
            console.error('[messageController] No hay info a actualizar o están malos los datos');
            reject('Datos incorrectos');
            return false; // acabo ejecución
        }
        
        const result = await store.patch(email, newRate);
        resolve(result)
        reject(result)

    });
    
}

module.exports = {
    get,
    post,
    patch
}

