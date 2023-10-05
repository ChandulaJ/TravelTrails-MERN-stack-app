//account = user

const express = require('express')
const router = express.Router()
const {
    createAccount,
    getAccount,
    getAccounts,
    deleteAccount,
    updateAccount
} = require('../controllers/accountController')


//get single account
router.get('/:id',getAccount)

//get all the accounts
router.get('/',getAccounts)


//create a new account
router.post('/',createAccount)

//delete a account
router.delete('/:id',deleteAccount)


//update a account
router.put('/:id',updateAccount)

module.exports = router
