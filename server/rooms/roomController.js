var Room = require('./room.server.model.js');
var Q = require('q');

module.exports = {
  newRoom: function (clientRoom) {
    var room = {};

    room.name = clientRoom.name;
    room.ownerName = clientRoom.user.socialData.name;
    room.owner = clientRoom.user._id;


    var createRoom = Q.nbind(Room.create, Room);

    createRoom(room)
      .then(function (createdRoom) {
        if (createdRoom) {
          res.json(createdRoom);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  allRooms: function(req, res, next) {
    var getRooms = Q.nbind(Room.find, Room);
    getRooms({})
    .then(function(allRooms) {
      if(allRooms) {
        res.json(allRooms);
      }
    })
    .fail(function(error) {
      next(error);
    });
  },

  updateRoom: function(req, res, next) {
    //we convert the request objects into strings just to be safe(req.user._id was coming back as an object for some reason)
    var user = String(req.user._id)
    var roomCreator = String(req.body.owner)

    //if user was not the originator of hte Room, throw an error
    if (user !== roomCreator) {
      console.log('user not authorized to update this resource. sending back 401 Unauthorized')
      res.status(401)
    }

    // create promise for Room.findById
    var findRoomById = Q.nbind(Room.findById, Room);

    // attempt to find the room by the id passed in
    findRoomById(req.params.room_id)
      .then(function(foundRoom) {
        // if the room is found update the name and save
        if (foundRoom) {
          foundRoom.name = req.body.name;
          foundRoom.save(function(err) {
            if (err) {
              res.send(err);
            }
            res.json(foundRoom);
          });
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  deleteRoom: function(req, res, next) {
    //we convert the request objects into strings just to be safe(req.user._id was coming back as an object for some reason)
    var user = String(req.user._id)
    var roomCreator = String(req.body.owner)

    //if user was not the originator of hte room, throw an error
    if (user !== roomCreator) {
      console.log('user not authorized to delete this resource. sending back 401 Unauthorized')
      res.status(401)
    }


    // create promise for Room.remove method
    var removeRoom = Q.nbind(Room.remove, Room);
    // delete room based on id passed in
    removeRoom({_id: req.params.room_id})
      .then(function(removedRoom) {
        // if the room has been removed, send success
        // and id to remove from roomStore
        if(removedRoom[1].ok) {
          res.json({
            message: 'Successfully deleted.',
            _id: req.params.room_id
          });
        }
      })
      .fail(function(error) {
        next(error);
      });
  }
};
