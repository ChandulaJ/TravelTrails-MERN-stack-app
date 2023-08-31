require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const socialPostRoutes = require('./routes/socialPosts')  
const accountRoutes = require('./routes/accounts')

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})



//routes
app.use('/api/socialPosts',socialPostRoutes)
app.use('/api/accounts',accountRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then((result)=>{
    
//listen for requests
app.listen(process.env.PORT, () => {
console.log('connected to db and listening on port ',process.env.PORT)
})
})
.catch((err)=>{console.log(err)})


process.env
