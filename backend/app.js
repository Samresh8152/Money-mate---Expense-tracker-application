
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express();

require('dotenv').config()

//middleware
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route)=>{
    app.use('/api/v1',require('./routes/'+route))
})



app.get('/' , (req,res)=>{
    res.send("hellow world")
})

const PORT = process.env.PORT
const server = ()=>{
    db()
  app.listen(PORT , ()=>{
    console.log('listening to ',PORT)
  })
}

server()




//samreshc31
//fGRR8asfEvROyNkI