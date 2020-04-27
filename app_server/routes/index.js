const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/groups');

const path = require('path');
/* Locations pages */

router.get('/', ctrlUser.homePage)
router.get('/app/', function(req, res) {
    res.sendFile(path.join(__dirname, '../vidente-app/build/index.html'));
});

module.exports = router;
