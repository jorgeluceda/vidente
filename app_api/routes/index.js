const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
const auth = jwt({
  // set secret using environment variable
  secret: process.env.JWT_SECRET,
  // defines the property to be 'payload'
  // instead of 'user' to avoid confusion
  userProperty: 'payload'
});

const ctrlUsers = require("../controllers/users");
const ctrlGroups = require('../controllers/groups');
const ctrlAuth = require('../controllers/authentication');

router
  .route('/users')
  .get(ctrlUsers.usersListByCreated);

router 
  .route('/user')
  .post(ctrlUsers.userCreate);

router
  .route('/groups')
  .get(auth, ctrlGroups.groupsListByCreated)
  .post(auth, ctrlGroups.groupsCreate)
  .delete(auth, ctrlGroups.groupsDeleteOne);

router
  .route('/labels')
  // // Read a specific user's property
  .get(auth, ctrlGroups.labelsListByCreated);

router
  .route('/register')
  .post(ctrlAuth.register);

router
  .route('/login')
  .post(ctrlAuth.login);

//exports routes
module.exports = router;
