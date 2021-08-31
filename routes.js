'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');

// This array is used to keep track of user records
// as they are created.
const users = [];

// Construct a router instance.
const router = express.Router();



// Route that returns a list of users.
router.get('/users', (req, res) => {
  res.json(users);
});



// Route that creates a new user.
router.post('/users', [check('name').exists({
  checkNull:true, checkFalsy:true
}).withMessage('Please provide a value for \'name\' '), check('email').exists({
  checkNull:true,
  checkFalsy:true,
}).withMessage('Please provide a value for \'email\' ')], (req, res) => {

  //Attempt to get the validation result from the request object
const errors = validationResult(req);

// if there are validation errors
if(!errors.isEmpty()){
  const errorMessages = errors.array().map(error => error.msg);
  res.status(400).json({errorrs: errorMessages});
} else{
 // Get the user from the request body.
  const user = req.body;

  // Add the user to the `users` array.
  users.push(user);

  // Set the status to 201 Created and end the response.
  res.status(201).end();
}

 
});

module.exports = router;
