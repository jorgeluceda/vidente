const mongoose = require('mongoose');

// Defines a schema for opening times
const openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});

// Defines a schema for reviews
const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
    // not 'required' since it is populated
    // when a new review is created
    createdOn: {
        type: Date,
        'default': Date.now
    }
    
});

// Starts the main location schema definition
const locationSchema = new mongoose.Schema({
    // name is a required field, since we want to ensure that 
    // each location has a name
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number, 
        // default doesnt *have* to be in quotes but we are using quotes 
        // since its a reserved keyword on Javascript, this avoids 
        // any type of confusion it may lead us to.
        'default': 0,
        min: 0,
        max: 5
    },
    address: String,
    // declares an array of the same Schema type
    // by declaring the type inside square brackets
    facilities: [String],
    // uses 2dsphere to add support for GeoJSON
    // longitude and latitude coordinate pairs
    coords: {   
        type: { type: String },
        coordinates: [Number]
    },
    // references the opening times and reviews
    // schemas to add nested subdocuments
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});


// defining the coords path as having a '2dsphere' index
// for geospatial indexing
locationSchema.index({coords: '2dsphere'})

// defines 'Location' model based on our location schema
// that also contains other schemas a sub-documents
mongoose.model('Location', locationSchema);
