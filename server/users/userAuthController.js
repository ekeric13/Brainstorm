'use strict';

var User = require('../db.js').User;
var passport = require('passport');
var session = require('express-session');
var configQuery = process.env.NODE_ENV ==='production' ? "productionConfig" : "config";
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


  //========== AUTHENTICATION REQUESTS===========================================//
  //========== github authenticate requests ==============================
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      console.log('req.session.passport.user: ', req.user);
      res.redirect('/');
    });

  // ========== facebook authenticate requests  ==========================
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      console.log('req.session.passport.user: ', req.user);
      res.redirect('/');
    });

  // ========== google authenticate requests  ============================
  app.get('/auth/google', passport.authenticate('google', { scope : 'email'}));
  app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      console.log('req.session.passport.user: ', req.user);
      res.redirect('/');
    });


  //========== CONFIGURATION OF STRATEGIES ======================================//
  // ========== github configure strategy ================================
  var GitHubStrategy = require('passport-github').Strategy;
  passport.use(
    new GitHubStrategy(config.github,
    function(accessToken, refreshToken, profile, done) {
      User.findOne({username: profile.emails[0].value}, function(err, user) {
        if(err) {
          console.log(err);
        }
        if (!user) {
          user = new User({ username: profile.emails[0].value, socialData: {name: profile.displayName} });
          user.save();
        }
        done(null, user);
      });
    }
  ));

// ========== facebook configure strategy ================================
  var FaceBookStrategy = require('passport-facebook').Strategy;
  passport.use(
    new FaceBookStrategy(config.facebook,  // Note that profile fields can be included to limit data included from facebook.
    function(accessToken, refreshToken, profile, done) {
      User.findOne({username: profile.emails[0].value}, function(err, user) {
        if(err) {
          console.log(err);
        }
        if (!user) {
          user = new User({ username: profile.emails[0].value, socialData: {name: profile.displayName} });
          user.save();
        }
        done(null, user);
      });
    }
  ));

  // ========== google configure strategy ================================
  // var GoogleStrategy = require('passport-google').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  passport.use(
    new GoogleStrategy(config.google,
    function(token, refreshToken, profile, done) {
      User.findOne({username: profile.emails[0].value}, function(err, user) {
        if(err) {
          console.log(err);
        }
        if (!user) {
          user = new User({ username: profile.emails[0].value, socialData: {name: profile.displayName} });
          user.save();
        }
        done(null, user);
      });
    }
  ));


};
