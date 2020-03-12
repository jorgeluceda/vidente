

const mongoose = require('mongoose');
const User = mongoose.model('User');

const groupsListByCreated = async (req, res) => {
    var userid = req.query.userid;
    if(!userid) {
        return res
            .status(404)
            .json("Error: need to pass userid parameter");
    }

    User
        .findById({_id: userid}, {groups: 1})
        .exec((err, groups) => {
            // traps if mongoose doesn't return
            // a location or if mongoose returns an error;
            // also sends a 404 response using return statement
            if(!groups) {
                return res
                    .status(404)
                    .json({
                        "message" : "'groups' array was not found, check source."
                    });
            } else if(err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(groups);
        });
};

const userCreate = (req, res) => {
    User.create({
        name: req.body.name,
        favorite: req.body.favorite,
        groups: [{
            name: req.body.favorite,
            labels: []
        }],
    }, (err, user) => {
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
                .json(user);
        }
    });
}
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

// const groupsReadOne = (req, res) => {
//     User
//         .findById(req.params.groupid)
//         .exec((err, location) => {
//             // traps if mongoose doesn't return
//             // a location or if mongoose returns an error;
//             // also sends a 404 response using return statement
//             if(!location) {
//                 return res
//                     .status(404)
//                     .json({
//                         "message" : "Location not found"
//                     });
//             } else if(err) {
//                 return res
//                     .status(404)
//                     .json(err);
//             }
//             res
//                 .status(200)
//                 .json(location);
//         });
// };

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
    groupsListByCreated,
    userCreate,
    // groupsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};