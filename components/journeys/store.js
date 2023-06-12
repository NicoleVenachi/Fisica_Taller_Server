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
async function get(trip_id) {

    let filter = {"metadata.trip_id": trip_id}

    data = await Model.findOne(filter);

    if (!data) {
        return "The trip's id does not belongs to any existing journey"
    }
    
    return data;
}

//crear usuario mensaje
async function post(route) {

    //busco si ya empezo una ruta con ese id
    const routeInfo = await Model.findOne({
        "metadata.trip_id": route.metadata.trip_id
    });
    try {
        if (!!routeInfo) {
            
            throw new Error('This route have already started')
        }
        else {
            //Insantacion route como objeto del modelo
            const myRoute = new Model(route);
            //Write:
            myRoute.save();
        }
        
    } catch (error) {
        return (error)
    }

}

async function patch(route) {
    
    

    let filter = {"metadata.trip_id": route.trip_id}

    //buscola ruta
    const journey = await Model.findOne(filter);

    //sino hay journey
    if (!journey) {
        return "The trip's id does not belongs to any existing journey"
    }
    //actualizo
    //journey.position = route.position
    await Model.updateMany(
        filter,
        { $set: { "metadata.position": route.position}},
    )
    //
    //{ $set: { "metadata": "s"}},
    // Model.updateMany(
    //     filter,
    //     { $set: { "position.lat": route.position.lat, "position.lng": route.position.lng} },
    // )
    //await journey.save()

    return "The journey's real-time position have been updated";
}

module.exports = {
    get,
    post,
    patch
}

