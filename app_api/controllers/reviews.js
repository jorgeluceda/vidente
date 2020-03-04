const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const doSetAverageRating = (location) => {
    if(location.reviews && location.reviews.length > 0) {
        const count = location.reviews.length;
        // uses the javascript array reduce method to
        // sum up the ratings of the documents
        // note, the second parameter represents the
        // initial Value in which we start accumulating from
        const total = location.reviews.reduce((acc, {rating}) => {
            return acc + rating;
        }, 0);

        // calculated the average rating value and updates
        // the rating value of the parent document
        location.rating = parseInt(total / count, 10)

        location.save(err => {
            if(err) {
                console.log(err);
            } else {
                console.log(`Average rating updated to ${location.rating}`);
            }
        });
    }
};

const updateAverageRating = (locationId) => {
    // finds the ocation based on the provided
    // location id data
    Loc.findById(locationId)
        .select('rating reviews')
        .exec((err, location) => {
            if(!err) {
                doSetAverageRating(location);
            }
        });
};

const doAddReview = (req, res, location) => {
    if(!location) {
        res
            .status(404)
            .json({"message": "Location not found"});
    } else {
        // using destructuring assignment to 
        // automatically unpack values from objects
        const {author, rating, reviewText} = req.body;

        // pushes new data into a subdocument array
        location.reviews.push({
            author,
            rating,
            reviewText
        });


        location.save((err, location) => {
            if(err) {
                res
                    .status(400)
                    .json(err)
            } else {
                // calls a function to update
                // the average rating on successful
                // save operation
                updateAverageRating(location._id);  
                
                // retrieves last review added to the array,
                // and returns it as a JSON confirmation 
                // response
                // Note: slice(-1) returns an an array including
                //       the last element of this object, while
                //       pop() removes the last element from the
                //       array and returns it (in this case, the
                //       only element that was sliced)
                const thisReview = location.reviews.slice(-1).pop();
                res
                    .status(201)
                    .json(thisReview);
            }
        });
    }
};

const reviewsCreate = (req, res) => {
    const locationId = req.params.locationid;
    if(locationId) {
        Loc
            .findById(locationId)
            .select('reviews')
            .exec((err, location) => {
                if(err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    // successful find operation will 
                    // call a new function to add a 
                    // review, passing request, 
                    // response, and location object.
                    doAddReview(req, res, location);
                }
            });
    } else {
        res
            .status(404)
            .json({"message": "Location not found"});
    }
};

const reviewsReadOne = (req, res) => {
    Loc
        .findById(req.params.locationid)
        .select('name reviews')
        .exec((err, location) => {

            // error trapping similar to locationsReadOne error trapping
            if(!location) {
                return res
                    .status(404)
                    .json({
                        "message" : "Location not found"
                    });
            } else if(err) {
                return res
                    // Returning status 400 (most likely a bad request)
                    .status(400)
                    .json(err);
            }

            // Checks that the returned location has reviews
            if(location.reviews && location.reviews.length > 0) {
                // passes reviewid from the parameters
                // into the id method
                const review = location.reviews.id(req.params.reviewid);
                
                // if a review isn't found, returns the appropriate
                // response
                if(!review) {
                    return res
                        .status(400)
                        .json({
                            "message": "review not found"
                        });
                } else {
                    // if review is found, builds a response
                    // object returning the review and location
                    // name and ID
                    response = {
                        location: {
                            name: location.name,
                            id: req.params.locationid
                        },
                        review
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
                        "message" : "No reviews found"
                    })
            }
        });
};

const reviewsUpdateOne = (req, res) => {
    // error trapping if no locationid or no reviewid
    // is provided
    // note: this allows us to immediately return 
    // without trying to find the document and
    // wasting resources/compute time.
    if(!req.params.locationid || !req.params.reviewid) {
        return res
            .status(404)
            .json({
                "message": "Not found, locationid and reviewid"
            });
    }

    Loc
        // find the parent document
        .findById(req.params.locationid)
        .select('reviews')
        .exec((err, location) => {
            if(!location) {
                return res
                    .status(404)
                    .json({
                        "message": "Location not found"
                    });
            } else if(err) {
                return res
                    .status(400)
                    .json(err);
            }

            if(location.reviews && location.reviews.length > 0) {
                const thisReview = location.reviews.id(req.params.reviewid);
                if(!thisReview) {
                    res
                        .status(404)
                        .json({
                            "message": "Review not found"
                        });
                } else {
                    // update the properties based on the
                    // body request
                    thisReview.author = req.body.author;
                    thisReview.rating = req.body.rating;
                    thisReview.reviewText = req.body.reviewText;
                    
                    location.save((err, location) => {
                        if(err) {
                            res
                                .status(404)
                                .json(err);
                        } else {
                            // use abstracted method to 
                            // update the average rating
                            // of this location
                            updateAverageRating(location._id);
                            res
                                .status(200)
                                .json(thisReview);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({
                        "message": "No review to update"
                    });
            }
        });
};

const reviewsDeleteOne = (req, res) => {
    const {locationid, reviewid} = req.params;
    if(!locationid || !reviewid) {
        return res
            .status(404)
            .json({
                "message": 'Not found, locationid and reviewid are both required'
            });
    }
    Loc
        .findById(locationid)
        .select('reviews')
        .exec((err, location) => {

            // error trapping and 
            // sending the correct error
            // response based on the type of 
            // error that occurred.
            if(!location) {
                return res
                    .status(404)
                    .json({"message": "Location not found"});
            } else if(err) {
                return res
                    .status(400)
                    .json(err);
            }

            if(location.reviews && location.reviews.length > 0) {
                if(!location.reviews.id(reviewid)) {
                    return res
                    .status(404)
                    .json({"message": "Review not found"});
                } else {
                    location.reviews.id(reviewid).remove();
                    location.save(err => {
                        if(err) {
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            updateAverageRating(location._id);
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
                        "message": "No review to delete"
                    });
            }
        });

};

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
};