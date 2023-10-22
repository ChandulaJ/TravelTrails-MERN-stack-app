const express = require("express");
const router = express.Router();
const {
  signupAccount,
  getAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
  loginAccount,
  addFriend, // New route to add a friend
  removeFriend, // New route to remove a friend
} = require("../controllers/accountController");

// Get a single account
router.get("/:id", getAccount);

// Get all the accounts
router.get("/", getAccounts);

// Create a new account
router.post("/signup", signupAccount);

// Login to an existing account
router.post("/login", loginAccount);

// Delete an account
router.delete("/:id", deleteAccount);

// Update an account
router.put("/:id", updateAccount);

// Add a friend to the current user
router.put("/add-friend/:accountId", addFriend);

// Remove a friend from the current user
router.put("/remove-friend/:accountId", removeFriend);

module.exports = router;
