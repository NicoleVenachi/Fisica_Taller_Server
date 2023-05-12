API_URL_DATA = 'https://codrive.onrender.com/user' 

data = {
  "name": "passenger",
  "password": "password",
  "email": "passengerrr@gmail.com",
  "type": "passenger",
}
function fetchData() {

  fetch(API_URL_DATA,
  {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(data)
  })
    .then(rawData=> rawData.json())
    .then(data=>  console.log(data.body))
    .catch(err =>{ 
        console.log(err.message)
    })
}

function fetchData() {

  fetch(API_URL_DATA,
  {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
    .then(rawData=> rawData.json())
    .then(data=>  console.log(data.body))
    .catch(err =>{ 
        console.log(err.message)
    })
}

fetchData()

// GET
fetch(API_URL_DATA+'?email=passenger@gmail.com',
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
fetch(API_URL_DATA+'?email=driver@gmail.com',
  {
      mode: 'cors',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "newRate": 3
      })
  })

  .then(rawData=> rawData.json())
  .then(data=>  console.log(data.body))
  .catch(err =>{ 
      console.log(err.message)
  })




// fetch(API_URL_DATA,
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