const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

if(process.env.NODE_ENV == 'production') {
    apiOptions.server = 'https://vidente-proto.herokuapp.com';
}

const renderHomePage = (req, res, responseBody) => {
    let message = null;

    // if the response message is not an array, 
    // sets a message and sets responseBody
    // to be an empty array
    if(!(responseBody instanceof Array)) {
        message = "API Lookup Error";
        responseBody = [];
    } else {
        // sets a message if the response message
        // is an empty array
        if(!responseBody.length) {
            message = "No places found nearby"
        }

    }
    //includes controller code for the homepage 
    res.render('locations-list', { 
        title: 'Loc8r - find a place to work with Wi-Fi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with Wi-Fi near you!'
        },
        locations: responseBody,
        message
    });

};

const formatDistance = (distance) => {
    let thisDistance = 0;
    let unit = 'm';

    if(thisDistance > 1000) {
        thisDistance = parseFloat(distance / 1000).toFixed(1);
        unit = 'm';
    } else {
        thisDistance = parseFloat(distance / 1000).toFixed(1);
        thisDistance = Math.floor(thisDistance);
    }
    
    return thisDistance + unit;
}

/* GET 'home' page */
const homelist = (req, res) => {
    const path = '/api/locations';

    // defines options for the request.
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {
            lng: 25.7544505,
            lat: -80.2636309,
            maxDistance: 20000
        }
    };

    request(requestOptions, (err, response, body) => {
        let data = [];

        // format distances only if the API
        // returned a 200 status and
        // some data
        if(response.statusCode == 200 && body.length)
        data = body.map((item) => {
            item.distance = formatDistance(item.distance);
            return item;
        });

        if(err) {
            console.log(err);
        } else if(response.statusCode == 200) {
            renderHomePage(req, res, data);
            console.log(body);
        } else {
            console.log(response.statusCode);
        }
    });

};

// rendering functionality for the Details page
// rendering in a different method allow us
// to separate concerns
const renderDetailPage = (req, res, location) => {
    //includes controller code for the Location Information page 
    res.render('location-info', { 
        title: 'Location Information - Loc8r',
        location
    });

}

const showError = (req, res, status) => {
    let title = '';
    let content = '';

    // sets the title and content for the page depending
    // on what the error status is
    if(status == 404) {
        title = '404, page not found';
        content = 'Oh dear, looks like you can\'t find this page. Sorry.';
    } else {
        title = `${status}, something's gone wrong`;
        content = 'Something, somewhere, has gone just a little bit wrong.';
    }

    res.status(status);

    // sends data to the view to be compiled
    // and sent to the browser
    res.render('generic-text', {
        title,
        content
    });
};

/* GET 'Location Information' with callback */
// accepts a callback as a third parameter
// and contains all the code that used to be
// in the locationInfo controller
const getLocationInfo = (req, res, callback) => {
    // append unique location id to generic api path
    const path = `/api/locations/${req.params.locationid}`;

    // sets all request options needed to call the API
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };

    request(requestOptions, (err, {statusCode}, body) => {
        const data = body;
        // checks for a successful response from the API
        if(statusCode == 200) {
            data.coords = {
                lng: body.coords[0],
                lat: body.coords[1]
            };
            //  invokes callback following successful api request
            callback(req, res, data);

        } else {
            // if check wasn't successful, passes the
            // error to the showError() function
            showError(req, res, statusCode);
        }
    });
};

const locationInfo = (req, res) => {
    getLocationInfo(req, res, 
        (req, res, responseData) => renderDetailPage(req, res, responseData)
    );
};

/* GET 'Add review' page */
const addReview = (req, res) => {
    getLocationInfo(req, res, 
        (req, res, responseData) => renderReviewForm(req, res, responseData)
    );
};

/* Renders review form in its own named function for
 *   separation of concerns 
*/
const renderReviewForm = (req, res, {name}) => { 
    //includes controller code for the Location Review Page 
    res.render('location-review-form', {
        title: `Review ${name} on Loc8r`,
        pageHeader: { title : `Review ${name}`},
        error: req.query.err
    });
};

const doAddReview = (req, res) => {
    const locationid = req.params.locationid;
    // get locationid from URL to construct the API url
    const path = `/api/locations/${locationid}/reviews`;

    // create data object to send to the API,
    // using the submitted form data
    const postData = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };

    // sets request options and pass the submitted 
    // form data into a json parameter
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postData
    };

    // if any of the required data fields is falsey, 
    // redirects to the Add Review page, appending the
    // query string used to display the error message
    if(!postData.author || !postData.rating || !postData.reviewText) {
        res.redirect(`/location/${locationid}/review/new?err=val`);
    }
    // makes the request
    request(
        requestOptions, 
        (err, {statusCode}, {name}) => {
            if(statusCode == 201) {
                // redirects to details page if review
                // was added successfully
                res.redirect(`/location/${locationid}`);
            } else if (statusCode == 400 && 
                name && name == 'ValidationError') {
                    // if true, redirects to review form, but passes error
                    // flag in a query string
                    res.redirect(`/location/${locationid}/review/new?err=val`);
            } else {
                // shows error page if the API returned
                // an error
                showError(req, res, statusCode);
            }
        }
    )
}

/* Exposes the index function as a method */
module.exports = {
    homelist,
    getLocationInfo,
    locationInfo,
    addReview,
    doAddReview
};