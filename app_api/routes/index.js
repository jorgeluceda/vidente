const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');

// locations
router 
    .route('/locations')
    // read list of locations
    .get(ctrlLocations.locationsListByDistance)
    // create new location
    .post(ctrlLocations.locationsCreate)

router
    .route('/locations/:locationid')
    // Read a specific location
    .get(ctrlLocations.locationsReadOne)
    // Update a specific location
    .put(ctrlLocations.locationsUpdateOne)
    // Delete a specific location
    .delete(ctrlLocations.locationsDeleteOne);

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
