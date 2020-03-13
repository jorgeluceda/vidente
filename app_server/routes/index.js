const express = require('express');
const router = express.Router();
// replaces exising ctrlMain reference with new requires
const ctrlUser = require('../controllers/groups');

const ctrlLabels = require('../controllers/labels');
const ctrlOthers = require('../controllers/others');
const path = require('path');
/* Locations pages */

router.get('/', ctrlUser.homePage)
router.get('/groups/', ctrlUser.groups);
router.get('/app/', function(req, res) {
    res.sendFile(path.join(__dirname, '../vidente-app/build/index.html'));
});

router.get('/label/', ctrlLabels.labelInfo);

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
