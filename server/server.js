'use strict';

var express = require('express');
var mongoose = require('./db.js');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var roomController = require('./rooms/roomController.js');



io.on('connection', function(client) {
  console.log('i joined')
  client.on('join-room', function(room) {
    client.join(room);
  });

  client.on('room-create', function(room){
    roomController.newRoom(room);

  })

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
    //call funciton here
    client.broadcast.emit('room-change', currentRooms);
  });

});

require('./config/middleware')(app, express);

module.exports = server;
