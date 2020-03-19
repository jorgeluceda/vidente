const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = (req, res) => {
  if(!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({"message": "All fields required"});
  }

  // creates new user instance
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  //create default favorite group
  user.favorite = "Favorites";
  user.groups = [{name: "Favorites", labels: []}];

  // uses schema method to set the salt and hash
  user.setPassword(req.body.password);
  // saves a new user to mongoDB
  user.save((err) => {
    if(err) {
      res
        .status(404)
        .json(err);
    } else {
      // generate jwt, using schema method, and
      // sends it to browser
      const token = user.generateJWT();
      res
        .status(200)
        .json({token});
    }
  })
};

const login = (req, res) => {
  // check if required fields are supplied
  if(!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({"message": "All fields required"});
  }

  // pass name of strategy and callback to authenticate method
  passport.authenticate('local', (err, user, info) => {
    let token;
    if(err) {
      return res
        .status(404)
        .json(err);
    }
    if(user) {
      token = user.generateJWT();
      res
        .status(200)
        .json({token});
    } else {
      res
        .status(401)
        .json(info);
    }
  }) (req, res);
};

module.exports = {
  register,
  login
};