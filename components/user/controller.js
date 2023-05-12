//****imports
const store = require('./store.js')


//para leer info de User
function get(filterUser){
    //paso al listar, el filtro
    return new Promise((resolve, reject) => {
        try {
            filterUser == undefined ? 
                reject('Especifique el/l@s usuari@(s)'):
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
            reject('Datos incorrectos');
            return false; // acabo ejecución
        }
        
        //antes de crearlo, consulto si ya existe en la DB
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



// // Para escribir  MSG
// async function updateMessage(id, message) {
//     // ***** Guarda mensaje con toda su info
    
//     return new Promise (async (resolve, reject) =>{
//         // -VALIDACIÓN- sino hay info, no lo añade
//         if (!id || !message) {
//             //log para mi en server
//             console.error('[messageController] No hay id, ni texto a actualizar');
//             reject('Datos incorrectos');
//             return false; // acabo ejecución
//         }
//         const result = await store.updateText(id, message);

//         resolve(result) //un mensaje

//     });
    
// }

module.exports = {
    get,
    post
}

