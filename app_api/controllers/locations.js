function seeLocation(results) {

    const locations = results.map(result => {
        return {
            id: result._id,
            name: result.name,
            address: result.address,
            rating: result.rating,
            facilities: result.facilities,
            distance: `${result.distance.calculated.toFixed()}`
        }
    });

    return locations;
}

/*
 * returns a list of locations by leveraging
 * geospatial queries available by using
 * the $geonear aggregate.
 * 
 * The $geonear aggregate requires the following 
 * configuration options:
 *  - near as a geoJSON geographical point
 *  - A distanceField object option
 *  - A maxDistance object option
 * 
 *  Below is a basic construct:
 * 
 *  Loc.aggregate([{$geonear: near: {}, 
 *          distanceField: "distance", maxDistance: 100 }]);
 */
const locationsListByDistance = async (req, res) => {
    // gets coordinates from the query string
    // and converts from strings to numbers
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const max_dist = parseFloat(req.query.max_dist);

    const near = {
        type: "Point",
        coordinates: [lng, lat]
    };

    const geoOptions = {
        distanceField: "distance.calculated",
        // spherical parameter calculates 
        // distances using spherical geometry
        // instead of 2D geometry
        // note: this is more accurate 
        //      at representing the true distance
        spherical: true,
        // limit of 20km (MongoDB does the
        // calculations in meters)
        maxDistance: max_dist,
        // ensure responsiveness 
        // by limiting the number of results
        // returned
        limit: 10
    };

    // Checks whether lng and lat query parameters
    // exist in the right format; returns a 404 error
    // and message if not
    if((!lng && lat !== 0) || (lng !== 0 && !lat)) {
        return res
            .status(404)
            .json({
                "message" : "lng and lat parameters are required"
            });
    }

    try {
        const results = await Loc.aggregate([
            {
                $geoNear: {
                    near,
                    // using the spread operator
                    // injects the object properties
                    // in geoOptions into the $geoNear
                    // object.
                    ...geoOptions
                }
            }
        ]);
        
        res
            .status(200)
            .json(seeLocation(results)); 
    } catch(err) {
        res
            .status(404)
            .json(err);
    }
  
};


const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsCreate = (req, res) => {
    // applies the create method to the model
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities:
            // creates an array of facilities
            // by splitting a comma-separated list
            req.body.facilities.split(","),
        coords: {
            type: "Point",
            coordinates :[
                parseFloat(req.body.lng),
                parseFloat(req.body.lat)
            ]
        },
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        },
        {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]   
    }, (err, location) => {
        // appropriate response methods for
        // dealing with both success and
        // failure
        if(err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(location);
        }
    });
};

const locationsReadOne = (req, res) => {
    Loc
        .findById(req.params.locationid)
        .exec((err, location) => {
            // traps if mongoose doesn't return
            // a location or if mongoose returns an error;
            // also sends a 404 response using return statement
            if(!location) {
                return res
                    .status(404)
                    .json({
                        "message" : "Location not found"
                    });
            } else if(err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(location);
        });
};

const locationsUpdateOne = (req, res) => {
    if(!req.params.locationid) {
        return res
            .status(404)
            .json({
                "message": "Not found, a locationid is required"
            });
    }

    Loc
        // find the specific document to update
        .findById(req.params.locationid)
        // exclude reviews and rating subdocuments
        // from location object that will be 
        // returned
        .select('-reviews -rating')
        .exec((err, location) => {
            if(!location) {
                return res
                    .status(404)
                    .json({
                        "message": "locationid not found"
                    });
            } else if(err) {
                return res
                    .status(404)
                    .json(err);
            }

            // makes changes to the model instance,
            // changing their corresponding values
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(',');
            
            location.coords = {
                type: "Point",
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            };

            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2,
            }];

            // saves the instance using save method
            location.save((err, loc) => {
                // returns a success or failure
                // response
                if(err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(loc);
                }
            });
        });
};

const locationsDeleteOne = (req, res) => {
    const {locationid} = req.params;

    // error trapping based on whether
    // locationid was passed as a parameter
    if(locationid) {
        Loc
            .findByIdAndRemove(locationid)
            .exec((err, location) => {
                // Do something with document if needed
                // before deleting here

                location.remove((err, loc) => {
                    // respond with failure or success
                    if(err) {
                        return res
                            .status(404)
                            .json(err);
                    }

                    res
                        .status(204)
                        .json(null);
                });
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No Location"
            });
    }
};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};