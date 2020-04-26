const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUser = (req, res, callback) => {
  if(req.payload && req.payload.email) {
    User.
      findOne({ email: req.payload.email})
      .exec((err, user) => {
        if(!user) {
          return res
            .status(404)
            .json({"message": "User Not found"});
        } else if(err) {
          console.log(err);
          return res
            .status(404)
            .json(err);
        }
        callback(req, res, user._id);
      });
  }
};

const groupsCreate = (req, res) => {
  getUser(req, res, (req, res, userId) => {
    if(userId) {
      User
        .findOneAndUpdate({_id: userId}, {
          $push: {
            groups: {
              name: req.body.name,
              labels: []
            }
          },
        }, {
            new: true
        })
        .select('-groups.labels -_id -name -email -favorite -salt -hash -_v')
        .exec((err, group) => {
          // appropriate response methods for dealing with both success and failure
          if(err) {
            res
              .status(400)
              .json(err);
          } else {
            res
              .status(200)
              .json(group);
          }
        });
    }
  });
};

const groupsListByCreated = (req, res) => {
  getUser(req, res, (req, res, userId) => {
    User
      .findById(userId)
      .sort({'groups.name': -1})
      .select('-groups.labels -salt -hash -name -email')
      .exec((err, groups) => {
        // traps if mongoose doesn't return
        // the groups or if mongoose returns an error;
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
  });

};

const groupsDeleteOne = (req, res) => {
  let groupId = req.body.groupId;
  getUser(req, res, (req, res, userId) => {
    User
      .findById(userId)
      .select('groups')
      .exec((err, user) => {
        // error trapping and
        // sending the correct error
        // response based on the type of
        // error that occurred.
        if (!user) {
          return res
            .status(404)
            .json({"message": "User not found"});
        } else if (err) {
          return res
            .status(400)
            .json(err);
        }

        if (user.groups && user.groups.length > 0) {
          if (!user.groups.id) {
            return res
              .status(404)
              .json({"message": "Group to delete not found"});
          } else {
            user.groups.id(groupId).remove();
            user.save(err => {
              if (err) {
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
  });
};


const labelsListByCreated = async (req, res) => {
  let groupId = req.query.id;

  if(!groupId) {
    return res
      .status(404)
      .json("Error: missing 'id' parameter")
  }

  getUser(req, res, (req, res, userId) => {
    if(!userId || !groupId) {
      return res
        .status(404)
        .json("Error: could not receive userId or groupId");
    }

    User
      .findById(userId)
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
          const group = user.groups.id(groupId);

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
  });
};

const labelsCreate = (req, res) => {
    let groupId = req.body.groupId;
    getUser(req, res, (req, res, userId) => {
        User
            .findById(userId)
            .select('groups')
            .exec((err, user) => {
                // error trapping and
                // sending the correct error
                // response based on the type of
                // error that occurred.
                if (!user) {
                    return res
                        .status(404)
                        .json({"message": "User not found"});
                } else if (err) {
                    return res
                        .status(400)
                        .json(err);
                }

                if (user.groups && user.groups.length > 0) {
                    if (!user.groups.id) {
                        return res
                            .status(404)
                            .json({"message": "Group to delete not found"});
                    } else {
                       let labels = user.groups.id(groupId).labels;

                       labels.push({name: req.body.labelName, sku: req.body.labelSku});

                        user.save(err => {
                            if (err) {
                                return res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(200)
                                    .json(JSON.stringify(user.groups.id(groupId).labels));
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
    });
};

const labelsUpdateOne = (req, res) => {
    let groupId = req.body.groupId;
    let labelId = req.body.labelId;

    getUser(req, res, (req, res, userId) => {
        User
            .findById(userId)
            .select('groups')
            .exec((err, user) => {
                // error trapping and
                // sending the correct error
                // response based on the type of
                // error that occurred.
                if (!user) {
                    return res
                        .status(404)
                        .json({"message": "User not found"});
                } else if (err) {
                    return res
                        .status(400)
                        .json(err);
                }

                if (user.groups && user.groups.length > 0) {
                    if (!user.groups.id) {
                        return res
                            .status(404)
                            .json({"message": "Group to delete not found"});
                    } else {
                        let label = user.groups.id(groupId).labels.id(labelId);

                        label.name = req.body.labelName;
                        label.sku = req.body.labelSku;

                        user.save(err => {
                            if (err) {
                                return res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(200)
                                    .json(label);
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
    });
};

const labelsDeleteOne = (req, res) => {
    let groupId = req.body.groupId;
    let labelId = req.body.labelId;

    getUser(req, res, (req, res, userId) => {
        User
            .findById(userId)
            .select('groups')
            .exec((err, user) => {
                // error trapping and
                // sending the correct error
                // response based on the type of
                // error that occurred.
                if (!user) {
                    return res
                        .status(404)
                        .json({"message": "User not found"});
                } else if (err) {
                    return res
                        .status(400)
                        .json(err);
                }

                if (user.groups && user.groups.length > 0) {
                    if (!user.groups.id) {
                        return res
                            .status(404)
                            .json({"message": "Group to delete not found"});
                    } else {
                        let label = user.groups.id(groupId).labels.id(labelId).remove();

                        user.save(err => {
                            if (err) {
                                return res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(200)
                                    .json(label);
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
    });
};

module.exports = {
    groupsListByCreated,
    groupsCreate,
    groupsDeleteOne,
    labelsListByCreated,
    labelsCreate,
    labelsUpdateOne,
    labelsDeleteOne
};