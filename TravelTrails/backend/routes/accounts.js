const express = require('express')
const router = express.Router()



//get single account
router.get('/:id',(req,res)=>{
    res.json({mssg:'Get single account'})
})

//create a new account
router.post('/',(req,res)=>{
    res.json({mssg:'Post a new account'})
})

//delete a account
router.delete('/:id',(req,res)=>{
    res.json({mssg:'Delete a  account'})
})


//update a account
router.patch('/:id',(req,res)=>{
    res.json({mssg:'Update a  account'})
})


module.exports = router