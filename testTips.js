//date3.toJSON()

//API_URL_DATA = 'https://codrive.onrender.com' 
API_URL_DATA = 'http://localhost:4005'
data = {
	"trip": {
		"pickUpPoint": {
				"lat": 2.44652,
				"lng": -76.59948,
			},
		"destination": {
				"lat": 2.45958,
				"lng": -76.59399,
			},
	},
	"driver": {
			"carInfo": {
				"plate": "abc-123",
				"seats": 4
			},
			"rate": {
				"rateSum": 35,
				"rateMean": 3.888888888888889,
				"totalRates": 9
			},
			"_id": "645e7a6d11f8c4abebeee8b0",
			"name": "driver",
			"password": "password",
			"email": "driver@gmail.com",
			"type": "driver",
			"__v": 0
		},
	"availableSeats": 4,
	"price": 7000,
	"date": "2023-06-25T20:30:00.000Z",
}

function postDriver() {

  return fetch(API_URL_DATA + '/trips',
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
  a = await postDriver()
  console.log(a)
}

prueba()