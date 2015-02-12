var mongoose = require('mongoose');
var db = {};

var pEnv = process.env;
var devDb = 'mongodb://localhost/brainstormer';
mongoose.connect(pEnv.MONGOLAB_URI || devDb);
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongo connection error:'));
database.on('open', function() { console.log('mongo hooked'); });
var userModel = require('./users/user.server.model.js');
var commentModel = require('./comments/comment.server.model.js');
var ideaModel = require('./ideas/idea.server.model.js');
var roomModel = require('./rooms/room.server.model.js');
var interestModel = require('./interests/interest.server.model.js');
db.User = mongoose.model('User');
db.Comment = mongoose.model('Comment');
db.Idea = mongoose.model('Idea');
db.Room = mongoose.model('Room');
db.Interest = mongoose.model('Interest');

module.exports = db;
