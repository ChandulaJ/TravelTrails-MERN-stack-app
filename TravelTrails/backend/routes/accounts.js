
const express = require('express')
const router = express.Router()
const {
    createAccount,
    getAccount,
    getAccounts
} = require('../controllers/accountController')


//get single account
router.get('/:id',getAccount)

//get all the accounts
router.get('/',getAccounts)


//create a new account
router.post('/',createAccount)

//delete a account
router.delete('/:id',(req,res)=>{
    res.json({mssg:'Delete a  account'})
})


//update a account
router.patch('/:id',(req,res)=>{
    res.json({mssg:'Update a  account'})
})


module.exports = router
