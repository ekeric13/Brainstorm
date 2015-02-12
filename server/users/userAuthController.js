'use strict';

var User = require('../db.js').User;
var passport = require('passport');
var session = require('express-session');

var configQuery = process.env ? "productionConfig" : "config";
var config = require('../config/'+ configQuery);

module.exports = function(app) {
  app.use(session({
    secret: 'hackReactorStudentsAreAwesome',
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());


  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    User.findOne({username: username}, function(err, user) {
      if (user) {
        done(null, user);
      } else {
        done(err, false);
      }
    });
  });


  app.get('/auth', passport.authenticate('github'));
  app.get('/auth/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      console.log('req.session.passport.user: ', req.user);
      res.redirect('/');
    });

  if (process.env) {
    var strategyConfiguration = {
      clientID: config.clientIDpro,
      clientSecret: config.clientSecretpro,
      callbackURL: config.callbackURLpro
    }
  } else {
    var strategyConfiguration = {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL
    }
  }


  var GitHubStrategy = require('passport-github').Strategy;
  passport.use(
    new GitHubStrategy(strategyConfiguration,
    function(accessToken, refreshToken, profile, done) {
      User.findOne({username: profile.username}, function(err, user) {
        if(err) {
          console.log(err);
        }

        if (!user) {
          user = new User({ username: profile.username, socialData: profile._json });
          user.save();
        }
        done(null, user);
      });
    }
  ));
};
