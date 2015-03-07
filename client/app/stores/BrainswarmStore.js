var Reflux = require("reflux");
var BrainswarmActions = require("../actions/BrainswarmActions");
var socket = io.connect();

var BrainswarmStore = Reflux.createStore({
  _brainswarms: [],

  listenables: BrainswarmActions,

  init: function() {
    // this.socketListener();
  },


  getAll: function() {
    return this._brainswarms;
  },

  socketListener: function(){
    socket.on('brainswarm-change', function(currentBrainswarms) {
      if (currentBrainswarms){
        // this._brainswarms = currentBrainswarms;
      }
      this.trigger();
    }.bind(this));
  },

  //checkBrainswarm: function(idea_id, callback){
  //  var brainswarms = this._brainswarms;
  //  for (var i =0; i < brainswarms.length; i++){
  //    if (brainswarms[i].idea === idea_id){
  //      return callback(brainswarms[i]);
  //    }
  //  }
  //  callback();
  //},

  getBrainswarm: function(idea_id, callback) {
    $.ajax({
      type: 'GET',
      url: '/brainswarms/' + idea_id
    })
      .done(function (brainswarmsData) {
        // var brainswarms = this._brainswarms;
        // for (var i = 0; i< brainswarmsData.length; i++){
        //   this._brainswarms.push(brainswarmsData[i]);
        //   if (brainswarmsData[i].idea === idea_id){
        //     var tempBrainswarm = brainswarmsData[i];
        //   }
        // }
        // socket.emit('brainswarm-change', this._brainswarms);
        console.log("correct brainswarm", brainswarmsData);
        this.trigger();
        if (brainswarmsData) {
          return callback(brainswarmsData[0]);
          // return tempBrainswarm;
        };
        callback();
      }.bind(this))
      .fail(function(error) {
        console.error(error);
      });

  },

  // findBrainswarm: function(brainswarmId) {
  //   var brainswarms = this._brainswarms;
  //   for (var i =0; i< brainswarms.length; i++){
  //      if (brainswarms[i]._id === brainswarmId){
  //        return brainswarms[i];
  //      }
  //   }
  // },

  getBrainswarmById: function(brainswarm_id, callback) {
    // This ajax call sends the brainswarm_id as an "idea_id" to the routes
    $.ajax({
      type: "GET",
      url: "/brainswarms/" + brainswarm_id
    })
      .done(function(brainswarmData){
        // this._brainswarms.push(brainswarmData);
        // console.log("brainswarm by brainswarmID", brainswarmData);
        this.trigger();
        callback(brainswarmData[0]);
      }.bind(this))
      .fail(function(error) {
        console.error(error);
      });
  },

  create: function(idea_id, name, callback) {
    $.ajax({
      type: 'POST',
      url: '/brainswarms/' + idea_id,
      data: {name: name}
    })
      .done(function(brainswarm) {
        // this._brainswarms.push(brainswarm);
        // _brainswarms[brainswarm._id] = brainswarm

        // broadcast that _rooms has changed
        // socket.emit('brainswarm-change', this._brainswarms);
        console.log("created brainswarm", brainswarm);
        this.trigger();
        callback(brainswarm._id);
      }.bind(this))
      .fail(function(error) {
        console.log(error);
      });
  },


  edit: function(brainswarmId, map) {
    $.ajax({
      type: 'PUT',
      url: '/brainswarms/' + brainswarmId,
      data: {map: map}
    })
      .done(function(brainswarmEdit) {

        // for (var i = 0; i < this._brainswarms.length; i++){
        //  if (this._brainswarms[i]._id === brainswarmEdit._id){
        //    this._brainswarms[i].map = brainswarmEdit.map
        //  }
        // };
        console.log("edited brainswarm", brainswarmEdit);
        this.trigger();
      }.bind(this))
      .fail(function(error) {
        console.log(error);
      });
  }

});

module.exports = BrainswarmStore;
