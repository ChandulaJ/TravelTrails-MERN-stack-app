//account = user

const express = require('express')
const router = express.Router()
const {
    signupAccount,
    getAccount,
    getAccounts,
    deleteAccount,
    updateAccount,
    loginAccount,
    addFriend
} = require('../controllers/accountController')


//get single account
router.get('/:id',getAccount)

//get all the accounts
router.get('/',getAccounts)


//create a new account
router.post('/signup',signupAccount)

//login to a existing account
router.post('/login',loginAccount)

//delete a account
router.delete('/:id',deleteAccount)


//update a account
router.put('/:id',updateAccount)

router.put('/:id/friends', addFriend);

module.exports = router
