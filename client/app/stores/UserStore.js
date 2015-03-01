var Reflux = require("reflux");
var UserActions = require("../actions/UserActions");

var UserStore = Reflux.createStore({

  listenables: [UserActions],
  _user: null,

  get: function() {
    return this._user;
  },

  getCurrentUser: function() {
    $.ajax({
      url: '/users',
      type: 'GET'
    })
    .done(function(user) {
      this._user = user;
      console.log("user returned", user);
      this.trigger();
    }.bind(this))
    .fail(function(err) {
      console.log(err);
    });
  },

  logout: function(callback) {
    $.ajax({
      url: '/users',
      type: 'DELETE'
    })
    .done(function(user) {
      console.log("logged out ", user);
      this._user = user;
      this.trigger();
      callback();
    }.bind(this))
    .fail(function(err) {
      console.log(err);
    });
  }
});

module.exports = UserStore;
