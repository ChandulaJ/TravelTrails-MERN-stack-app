require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2

const socialPostRoutes = require('./routes/socialPosts')  
const accountRoutes = require('./routes/accounts')
const app = express()


//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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
