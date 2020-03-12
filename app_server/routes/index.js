const express = require('express');
const router = express.Router();
// replaces exising ctrlMain reference with new requires
const ctrlHomepage = require('../controllers/groups');

const ctrlLabels = require('../controllers/labels');
const ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/groups/', ctrlHomepage.groups);

// contains locationid parameter so that we
// can request a specific location in the API
router.get('/label/', ctrlLabels.labelInfo);
// 
// router.get('/location/:locationid', ctrlLabels.locationInfo);

router
    // updates router syntax to leverage locationid
    .route('/location/:locationid/review/new')
    .get(ctrlLabels.addReview)
    // creates a new route on the same URL, but using
    // the POST method and referencing a different controller
    .post(ctrlLabels.doAddReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
