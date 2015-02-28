var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require('events').EventEmitter;
var IdeaConstants = require("../constants/IdeaConstants");
var PageConstants = require("../constants/PageConstants");
var PageStore = require("./PageStore");
var assign = require("object-assign");
var socket = io.connect();

var CHANGE_EVENT = 'change';

var IdeaStore = assign({}, EventEmitter.prototype, {
  _ideas: [],

  _room: '',

  setRoom: function(currentRoom) {
    _room = currentRoom;
  },

  getAll: function() {
    return this._ideas;
  },

  socketListener: function(){
    socket.on('idea-change', function(currentIdeas) {
      this._ideas = currentIdeas;
      this.emitChange();
    }.bind(this));
  },

  get: function (room_id) {
    $.ajax({
      type: 'GET',
      url: '/ideas/' + room_id
    })
    .done(function (ideas) {
      this._ideas = ideas;

      // broadcast that _ideas has changed
      this.emitChange();
    }.bind(this))
    .fail(function(error) {
      console.error(error);
    });
    this.socketListener();
  },

  all: function () {
    $.ajax({
      type: 'GET',
      url: '/ideas'
    })
    .done(function (ideas) {
      this._ideas = ideas;
      // broadcast that _ideas has changed
      this.emitChange();
    }.bind(this))
    .fail(function(error) {
      console.error(error);
    });
    this.socketListener();
  },

  create: function (room_id, name) {
    $.ajax({
      type: 'POST',
      url: '/ideas/' + room_id,
      data: {name: name}
    })
    .done(function (idea) {
      this._ideas.push(idea);

      // broadcast that _ideas has changed
      socket.emit('idea-change', this._ideas, room_id);
      this.emitChange();
    }.bind(this))
    .fail(function(error) {
      console.error(error);
    });
  },

  edit: function(idea) {
    $.ajax({
      type: 'PUT',
      url: '/ideas/' + idea.id,
      data: idea
    })
    .done(function(ideaEdit) {
      // look through the ideas until finding a match
      // for id and then update the name property
      this._ideas.forEach(function(idea) {
        if(idea._id === ideaEdit._id) {
          idea.name = ideaEdit.name;
          idea.position = ideaEdit.position;

          // broadcast that _ideas has changed
          socket.emit('idea-change', this._ideas, this._room);
          // return this.emitChange();
        }
      }.bind(this));
      this.emitChange();
    }.bind(this))
    .fail(function(error) {
      console.error(error);
    });
  },

  delete: function(idea) {
    $.ajax({
      type: 'DELETE',
      url: '/ideas/' + idea.id,
      data: idea
    })
    .done(function(oldId) {
      console.log("idea deleted")
      // find deleted idea by oldId in _ideas and remove
      this._ideas.forEach(function(idea, index) {
        if(idea._id === oldId._id) {
          this._ideas.splice(index, 1);

          // broadcast that _ideas has changed
          socket.emit('idea-change', this._ideas, this._room);
          // return this.emitChange();
        }
      }.bind(this));
      this.emitChange();
    }.bind(this))
    .fail(function(error) {
      console.error(error);
    });
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// register a callback function with the AppDispatcher
// that will respond to the IdeaConstants listed below
AppDispatcher.register(function (payload) {
  var action = payload.action;
  var name;

  switch (action.actionType) {
    case IdeaConstants.IDEA_CREATE:
      name = action.name.trim();

      if (name !== '') {
        IdeaStore.create(action.room_id, name);
      }
      break;
    case IdeaConstants.IDEA_EDIT:
      if(action.idea.name !== '') {
        IdeaStore.edit(action.idea);
      }
      break;
    case IdeaConstants.IDEA_DELETE:
      if(action.idea.id !== '') {
        IdeaStore.delete(action.idea);
      }
      break;
    case PageConstants.GETROOMDATA:
      if (action.room_id){
        IdeaStore.get(action.room_id);
      }
      break;
    default:
      return true;
  }
});

module.exports = IdeaStore;
