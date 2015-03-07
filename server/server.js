'use strict';

var express = require('express');
var mongoose = require('./db.js');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var brainswarmController = require('./brainswarms/brainswarmController');



io.on('connection', function(client) {

  client.on('join', function(room) {
    if (client.brainswarm){
      client.leave(client.brainswarm);
    }
    client.room = room;
    client.join(room);
  });

  // client.on('join-brainswarm', function(brainswarm) {
  //   client.join(brainswarm);
  // });


  client.on('comment-change', function(currentComments, room) {
    client.broadcast.in(room).emit('comment-change', currentComments);
  });

  client.on('idea-change', function(currentIdeas, room) {
    client.broadcast.in(room).emit('idea-change', currentIdeas);
  });

  client.on('interest-change', function(currentInterests, room) {
    client.broadcast.in(room).emit('interest-change', currentInterests);
  });

  client.on('room-change', function(currentRooms) {
    client.broadcast.emit('room-change', currentRooms);
  });

// Possibly take this out.
  client.on('brainswarm-change', function(currentBrainswarms){
    client.broadcast.emit('brainswarm-change', currentBrainswarms);
  });

  //
//
//
//Jared's code start here
  client.on('join brainswarm', function(brainswarm) {
    //console.log('SERVER JOIN', brainswarm)
    client.brainswarm = brainswarm;
    client.join(brainswarm);
    // console.log(client.rooms)
  });

  client.on('brainswarm change', function(currentBrainswarms) {
    // console.log('LEFT ROOM', currentBrainswarms)
    client.leave(currentBrainswarms);
  });

  client.on('brainswarm leave', function(currentBrainswarms) {
    // console.log('LEFT ROOM', currentBrainswarms)
    client.leave(currentBrainswarms);
  });

  client.on('map change', function(editMap){
    //console.log("CHANGES IN ROOMs",client.brainswarm);
    // console.log("THESSE ARE CHANGES",editMap);

    if(editMap.toSave){
     // console.log("being saved");
      brainswarmController.updateBrainswarm(client.brainswarm, editMap.mapData);
    }
    client.broadcast.to(client.brainswarm).emit('edit map', editMap.mapData);
  });

  client.on('join ideaRoom', function(ideaRoom) {
    //console.log('SERVER JOIN', brainswarm)
    client.ideaRoom = ideaRoom;
    client.join(ideaRoom);
    // console.log(client.rooms)
  });

  client.on('leave ideaRoom', function(ideaRoom) {
    // console.log('LEFT ROOM', currentBrainswarms)
    client.leave(ideaRoom);
  });

  client.on('idea change', function(obj){
    //console.log("CHANGES IN IDEA", obj);
    client.broadcast.to(client.ideaRoom).emit('edit location', obj);
  });

});

require('./config/middleware')(app, express);

module.exports = server;
