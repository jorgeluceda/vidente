const express = require('express');
const router = express.Router();
// replaces exising ctrlMain reference with new requires
const ctrlLocations = require('../controllers/labels');
const ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlLocations.homelist);

router.get('/main', ctrlLocations.homelist);

// contains locationid parameter so that we
// can request a specific location in the API
router.get('/label/', ctrlLocations.labelInfo);
// 
// router.get('/location/:locationid', ctrlLocations.locationInfo);

router
    // updates router syntax to leverage locationid
    .route('/location/:locationid/review/new')
    .get(ctrlLocations.addReview)
    // creates a new route on the same URL, but using
    // the POST method and referencing a different controller
    .post(ctrlLocations.doAddReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
