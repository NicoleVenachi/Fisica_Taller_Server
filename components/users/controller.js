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

// Para crear  user
function post(user) {
    return new Promise ((resolve, reject) =>{
        // -VALIDACIÓN- sino hay info, no lo añade
        if (!user) {
            //log para mi en server
            console.error('[messageController] No hay usaurio');
            reject('Missing data');
            return false; // acabo ejecución
        }
        
        //antes de crearlo, consulto si ya existe en la DB
        //realmente lo deberia hacer en store, y no aquí
        get(user.email)
            .then(data => {
                if (data[0]?.email != user.email) {
                    
                    store.post(user);
                    resolve('User created') //devolver algo
                } else {
                    reject('Email is Already Registered')
                }
            })
            .catch(err=>{
                reject(err)
            })
        
        

    });
    
}

// Para actualizar el rate al driver
async function patch(email, newRate) {
    
    return new Promise (async (resolve, reject) =>{
        // -VALIDACIÓN- sino hay info, no lo añade
        if (!email || !newRate  || !(newRate>=0 & newRate<=5)) {
            //log para mi en server
            console.error('[messageController] No hay info a actualizar o están malos los datos');
            reject('Missing data');
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

