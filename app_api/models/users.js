const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const labelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        required: true
    },
    labels: [labelSchema],
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //email should be unique
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    favorite: {
        type: String,
        required: true,
    },
    groups: [groupSchema]
});

// sets the encrypted password in the User Model
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 65, 'sha512')
    .toString('hex');
};

// validates the submitted password
userSchema.methods.validPassword = function (password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 65, 'sha512')
      .toString('hex');
    console.log(hash);
    console.log(this.hash);
    return this.hash === hash;
};

// Provides a unique JWT to a user based on
// a signature object and a secret hash
userSchema.methods.generateJWT = function() {
    const expiry = new Date();
    // sets the expiration date of our token to
    // seven days for all users
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000, 10)
    }, process.env.JWT_SECRET);
};

// indexing by name for all of our schemas
userSchema.index({name: "text"});
groupSchema.index({name: "text"});
labelSchema.index({name: "text"});

mongoose.model('User', userSchema);

const User = mongoose.model('User');

const testUser = new User();
testUser.name = "Test User";
testUser.email = "test@test.com";
//create default favorite group
testUser.favorite = "Favorites";
testUser.groups = [{name: "Favorites", emoji: "🔥", labels: []}];

// uses schema method to set the salt and hash
testUser.setPassword("test");
testUser.save((err, user) => {
    if(err) {
        console.log(JSON.stringify(err.errmsg));
    }
});

