var CHANGE_EVENT = 'change';
var EventEmitter = require('events').EventEmitter;
var assign = require("object-assign");
var $ = require("jquery");

var UserStore = assign({}, EventEmitter.prototype, {
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

      this.emitChange();
    }.bind(this))
    .fail(function(err) {
      console.log(err);
    });
  },

  logout: function() {
    $.ajax({
      url: '/users',
      type: 'DELETE'
    })
    .done(function(user) {
      console.log("logged out ", user);
      this._user = user;
      this.emitChange();
    }.bind(this))
    .fail(function(err) {
      console.log(err);
    });
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = UserStore;
