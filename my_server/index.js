const express = require('express')
const app = express()
const port = 3000
const cors=require('cors')
app.use(cors())
const mongoose = require('mongoose')

// Mongoose connect mongodb cloud
// mongoose.connect(process.env.CONNECTION_STRING)
// .then(()=>{
//     useNewUrlParser: true,
//     useUnifi
    
// })
// .catch((err)=>{
//     console.log(err);
// })


//Http Request Logger
// const morgan = require('morgan')
// app.use(morgan("combined"))

// Parsing data received from the client
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Connecting with mongodb
const db = require("./config/db");
db.connect();



//+++++++++Router++++++++++
const exampleRouter = require('./routes/example.router')
app.use('/', exampleRouter)


app.listen(port, () => {
    console.log (`My server's listening on port: ${port}`)
})
