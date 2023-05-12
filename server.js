//*** EXpress */

const express = require('express');
const router = require('./network/routes')


const app = express();

app.use(express.json()) //para no usar un body parser

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


//llamo al router
router(app);

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log('Up & running, *' + PORT))
