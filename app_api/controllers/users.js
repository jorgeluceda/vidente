const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const usersListByCreated = (req, res) => {
  Users
    .find({})
    .select("name id")
    .exec((err, users) => {
      // traps if mongoose doesn't return
      // a location or if mongoose returns an error;
      // also sends a 404 response using return statement
      if (!users) {
        return res
          .status(404)
          .json({
            "message": "No users were found, check source."
          });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      }
      if(users.length == 0) {
        res
          .status(200)
          .json({
            users: users
          });
      }
      else {
        res
          .status(200)
          .json({
            users: users
          });
      }

    });
}
const groupsListByCreated = (req, res) => {
    var userid = req.query.userid;
    if(!userid) {
        return res
            .status(404)
            .json("Error: need to pass userid parameter");
    }

    Users
        .findById({_id: userid})
        // .select("")
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
    console.log(req.body);
    if(!req.body.name || !req.body.favorite) {
        return res
            .status(404)
            .json("Error: 'name' or 'favorite' body keys needed.");
    }

    Users.
    create({
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
};

const userReadOne = (req,res) => {
    if(!userid) {
        return res
            .status(404)
            .json("Error: missing 'userid' parameter");
    }

    if(!property) {
        return res
            .status(404)
            .json("Error: missing 'property' parameter");
    }

    User
        .findById(req.query.userid)
        .exec((err, user) => {
            // traps if mongoose doesn't return
            // a location or if mongoose returns an error;
            // also sends a 404 response using return statement
            if(!user) {
                return res
                    .status(404)
                    .json({
                        "message" : "User not found"
                    });
            } else if(err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(user.name);
        });   
}

// const userReadOne = (req,res) => {
//     if(!userid) {
//         return res
//             .status(404)
//             .json("Error: missing 'userid' parameter");
//     }

//     if(!property) {
//         return res
//             .status(404)
//             .json("Error: missing 'property' parameter");
//     }

//     User
//         .findById(req.query.userid)
//         .exec((err, user) => {
//             // traps if mongoose doesn't return
//             // a location or if mongoose returns an error;
//             // also sends a 404 response using return statement
//             if(!user) {
//                 return res
//                     .status(404)
//                     .json({
//                         "message" : "User not found"
//                     });
//             } else if(err) {
//                 return res
//                     .status(404)
//                     .json(err);
//             }
//             res
//                 .status(200)
//                 .json(user);
//         });   
// }

const userUpdateOne = (req, res) => {
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

const userDeleteOne = (req, res) => {
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
    usersListByCreated,
    groupsListByCreated,
    userCreate,
    userReadOne,
    userUpdateOne,
    userDeleteOne
};