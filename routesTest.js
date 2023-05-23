//API_URL_DATA = 'https://codrive.onrender.com' 
API_URL_DATA = 'http://localhost:4005'
data = {
  "name": "passenger",
  "password": "password",
  "email": "passenger2@gmail.com",
  "type": "passenger",
}

// ************************************** CREAR USUARIOS
// aas'i se va a leer en el front-end
function fetchData() {

  return fetch(API_URL_DATA + '/users',
  {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
    .then(res=> {
      //si el estado de la respuesta no es ok, imprime el error body
      return !res.ok ? 
        res.json().then(data =>{
          throw new Error(data.error)
        }) 
        :
        res.json()
    })
    .then(data=>  {
      return data.body
    })
    .catch(err =>{ 
        return err.message
    })
}

const prueba = async () =>{
  a = await fetchData()
  console.log(a)
}

prueba()


// ********* GET, TRAER UN USAURISO **********
fetch(API_URL_DATA+ '/users'+ '?email=passenger@gmail.co',
  {
      mode: 'cors',
      method: 'GET',
  })

  .then(rawData=> rawData.json())
  .then(data=>  console.log(data.body))
  .catch(err =>{ 
      console.log(err.message)
  })







// PATCH- actualizar
// fetch(API_URL_DATA+ '/users' + '?email=driver@gmail.com',
//   {
//       mode: 'cors',
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         "newRate": 3
//       })
//   })

//   .then(rawData=> rawData.json())
//   .then(data=>  console.log(data.body))
//   .catch(err =>{ 
//       console.log(err.message)
//   })



//get varios usuarios
// fetch(API_URL_DATA + '/users',
//   {
//       mode: 'cors',
//       method: 'GET',
//   })
//   // .then(rawData => console.log(rawData))
//   .then(rawData=> rawData.json())
//   .then(data=>  data.body)
//   .then(data => {
//       writeData(data.meanTemperature, data.meanHumidity, data.meanLuxP)
//   })
//   .catch(err =>{ 
//       console.log(err.message)
//       writeData(23, 87, 60)
//   })