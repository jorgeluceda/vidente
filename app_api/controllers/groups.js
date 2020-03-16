const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const groupsCreateOne = (req, res) => {
    console.log("GOT HERE");

    if(!req.body.name) {
        return res
            .status(404)
            .json("Error: 'name' body key needed.");
    }

    Users
        .findOneAndUpdate(req.params.userid, {
            $push: {
                groups: {
                    name: req.body.name,
                    labels: []
                }
            }
        })
        .exec((err, group) => {
            // appropriate response methods for
            // dealing with both success and
            // failure
            if(err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(200)
                    .json(`${req.body.name} was successfully pushed to ${req.params.userid}`);
            }
        });
};

const groupsDeleteOne = (req, res) => {
    const {userid, groupid} = req.params;
    if(!userid || !groupid) {
        return res
            .status(404)
            .json({
                "message": 'userid and groupid are both required'
            });
    }

    Users
        .findById(userid)
        .select('groups')
        .exec((err, user) => {

            // error trapping and
            // sending the correct error
            // response based on the type of
            // error that occurred.
            if(!user) {
                return res
                    .status(404)
                    .json({"message": "User not found"});
            } else if(err) {
                return res
                    .status(400)
                    .json(err);
            }

            if(user.groups && user.groups.length > 0) {
                if(!user.groups.id(groupid)) {
                    return res
                        .status(404)
                        .json({"message": "Review not found"});
                } else {
                    user.groups.id(groupid).remove();
                    user.save(err => {
                        if(err) {
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({
                        "message": "No group to delete"
                    });
            }
        });

};

const labelsListByCreated = async (req, res) => {
    var userid = req.params.userid;
    var groupid = req.params.groupid;

    if(!userid || !groupid) {
        return res
            .status(404)
            .json("Error: need to pass 'userid' or 'groupid' parameters");
    }

    Users
        .findById(userid)
        .exec((err, user) => {

            // error trapping similar to locationsReadOne error trapping
            if(!user) {
                return res
                    .status(404)
                    .json({
                        "message" : "User not found"
                    });
            } else if(err) {
                return res
                    // Returning status 400 (most likely a bad request)
                    .status(400)
                    .json(err);
            }
            
            // Checks that the returned user has groups
            if(user.groups && user.groups.length > 0) {
                // const group = user.groups.id(groupid);
                const group = user.groups.id(groupid);
                
                // if a review isn't found, returns the appropriate
                // response
                if(!group) {
                    return res
                        .status(400)
                        .json({
                            "message": "Group not found"
                        });
                } else {
                    // if group is found, builds a response
                    // object returning the review and location
                    // name and ID
                    var response = {
                        group: {
                            name: group.name,
                            id: group.id
                        },
                        labels: group.labels
                    };

                    return res
                        .status(200)
                        .json(response)
                }
            } else {
                return res
                    // returns appropriate error message
                    // if no reviews are found
                    .status(404)
                    .json({
                        "message" : "Labels found"
                    });
            }
        });
};


module.exports = {
    groupsCreateOne,
    groupsDeleteOne,
    labelsListByCreated,

};