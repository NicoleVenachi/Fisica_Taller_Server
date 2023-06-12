//****imports
const { response } = require('express');
const store = require('./store.js');
const { success } = require('../../network/response.js');


//para leer info de User
function get(trip_id){
    //paso al listar, el filtro
    return new Promise((resolve, reject) => {
        try {
            trip_id == undefined ? 
                reject('Please, specify trip id'):
                resolve(store.get(trip_id))
        } catch (error) {
            reject(error)
        }
    })
}

// Para crear  route
function post(route) {

    return new Promise (async (resolve, reject) =>{
        // -VALIDACIÓN- sino hay info, no lo añade
        if (!route || !route.trip_id || !route.position) {
            //log para mi en server
            console.error('[messageController] No hay usaurio');
            reject('Missing data');
            return false; // acabo ejecución
        }
        try {
            data = {
                metadata: route,
                timestamp: new Date()
            }
            
            upcomingErr = await store.post(data);
            
            if (!!upcomingErr) {
                throw new Error(upcomingErr)
            } else {
                resolve('Realtime Route started') //devolver algo
            }
        } catch (error) {
            reject(error.message)
        }
    });
    
}

// Para actualizar el rate al driver
async function patch(route) {
    
    return new Promise (async (resolve, reject) =>{
        // -VALIDACIÓN- sino hay info, no lo añade
        if (!route || !route.trip_id || !route.position) {
            //log para mi en server
            console.error('[messageController] No hay info a actualizar o están malos los datos');
            reject('Missing data');
            return false; // acabo ejecución
        }
        
        try {
            const result = await store.patch(route);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    });
    
}

module.exports = {
    get,
    post,
    patch
}

