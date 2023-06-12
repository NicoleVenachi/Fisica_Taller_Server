//date3.toJSON()

//API_URL_DATA = 'https://codrive.onrender.com' 
API_URL_DATA = 'http://localhost:4005'

//DATA dummie de prueba

data_post = {
	"route": {
		"trip_id": "647147b3d7ee2ac764f6744b",
		"position": {
				"lat": 2.44652,
				"lng": -76.59948
			}
	}
}

data_patch = {
	"route": {
		"trip_id": "647147b3d7ee2ac764f6744b",
		"position": {
				"lat": 2.44652,
				"lng": -76.59948
			}
	}
}

// ********post
// function postJourney() {

//   return fetch(API_URL_DATA + '/journeys',
//   {
//       mode: 'cors',
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data_post)
//   })
//     .then(res=> {
//       //si el estado de la respuesta no es ok, imprime el error body
//       return !res.ok ? 
//         res.json().then(data =>{
//           throw new Error(data.error)
//         }) 
//         :
//         res.json()
//     })
//     .then(data=>  {
//       return data.body
//     })
//     .catch(err =>{ 
//         return err.message
//     })
// }

// const prueba = async () =>{
//   a = await postJourney()
//   console.log(a)
// }

// prueba()

// ****ptch

// function updateJourney() {

//   return fetch(API_URL_DATA + '/journeys',
//   {
//       mode: 'cors',
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data_patch)
//   })
//     .then(res=> {
//       //si el estado de la respuesta no es ok, imprime el error body
//       return !res.ok ? 
//         res.json().then(data =>{
//           throw new Error(data.error)
//         }) 
//         :
//         res.json()
//     })
//     .then(data=>  {
//       return data.body
//     })
//     .catch(err =>{ 
//         return err.message
//     })
// }

// const prueba = async () =>{
//   a = await updateJourney()
//   console.log(a)
// }

// prueba()


// **** Get

function getJourney() {

  return fetch(API_URL_DATA + '/journeys' + '?trip_id=647147b3d7ee2ac764f6744b',
  {
      mode: 'cors',
      method: 'GET',
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
  a = await getJourney()
  console.log(a)
}

prueba()

