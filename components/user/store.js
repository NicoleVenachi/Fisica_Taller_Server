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
function post(user) {
    //Insantacion mensaje como clase del modelo
    const myUser = new Model(user);
    
    //Write:
    myUser.save();
}



// async function updateText(id, message) {
//     //busco el mensaje del modelo
//     const foundMessage = await Model.findOne({
//         id: id
//     });

//     //actualizo
//     foundMessage.message = message;

//     //save
//     const newMessage = await foundMessage.save()

//     return newMessage;
//}

module.exports = {
    get,
    post
    //getMsgParticular
    //update
    //delte
}

