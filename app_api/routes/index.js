const express = require('express');
const router = express.Router();
// const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlUsers = require("../controllers/users");
const ctrlGroups = require('../controllers/groups')
// locations
router 
    .route('/user')

    .get(ctrlUsers.groupsListByCreated)
    .post(ctrlUsers.userCreate)

router 
    .route('/user/:userid/groups/:groupid')
    // // Read a specific user's property
    .get(ctrlGroups.labelsListByCreated)

    // .post(ctrlGroups.groupCreate)
    // Update a specific user's property
    // .put(ctrlGroups.userUpdateOne)
    // // Delete a specific user's property
    // .delete(ctrlGroups.userDeleteOne);

// router 
//     .route('/user/:userid/groups/:groupid')
//     // Read a specific user's group
//     .get(ctrlGroups.groupReadOne)
//     // Update a specific user's group
//     .put(ctrlGroups.groupUpdateOne)
//     // Delete a specific user's group list
//     .delete(ctrlGroups.groupDeleteOne);
// router
//     .route('/user/:userid')
//     // Read a specific location
//     .get(ctrlLocations.locationsReadOne)
//     // Update a specific location
//     .put(ctrlLocations.locationsUpdateOne)
//     // Delete a specific location
//     .delete(ctrlLocations.locationsDeleteOne);

// reviews
router
    .route('/locations/:locationid/reviews')
    // Create new review
    .post(ctrlReviews.reviewsCreate)

router
    .route('/locations/:locationid/reviews/:reviewid')
    // Read a specific review
    .get(ctrlReviews.reviewsReadOne)
    // Update a specific review
    .put(ctrlReviews.reviewsUpdateOne)
    // Delete a specific review
    .delete(ctrlReviews.reviewsDeleteOne)

//exports routes
module.exports = router;
