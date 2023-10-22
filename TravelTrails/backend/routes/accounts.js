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
    addFriend,
    removeFriend
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

router.put('/:id/friends', (req, res) => {
    if (req.body.action === 'add') {
      addFriend(req, res);
    } else if (req.body.action === 'remove') {
      removeFriend(req, res);
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  });
module.exports = router
