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
  .route('/user/:userid/groups')
  .get(ctrlGroups.groupsListByCreated)
  .post(auth, ctrlGroups.groupsCreate)
  .delete(auth, ctrlGroups.groupsDeleteOne);

router
  .route('/user/:userid/groups/:groupid')
  // // Read a specific user's property
  .get(ctrlGroups.labelsListByCreated);

router
  .route('/register')
  .post(ctrlAuth.register);

router
  .route('/login')
  .post(ctrlAuth.login);

//exports routes
module.exports = router;
