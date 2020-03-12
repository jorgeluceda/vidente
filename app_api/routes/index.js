const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlGroups = require("../controllers/groups");
// locations
router 
    .route('/user')
    // read list of groups
    // .get(ctrlLocations.locationsListByDistance)
    .get(ctrlGroups.groupsListByCreated)
    // create new location
    // .post(ctrlLocations.locationsCreate)
    .post(ctrlGroups.userCreate)


// router 
//     .route('/user/:userid')
    // Read a specific user's group
    // .get(ctrlGroups.groupsReadOne)
    // // Update a specific user
    // .put(ctrlLocations.locationsUpdateOne)
    // // Delete a specific location
    // .delete(ctrlLocations.locationsDeleteOne);

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
