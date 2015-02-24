var Idea = require('./idea.server.model.js');
var Q = require('q');

module.exports = {
  newIdea: function (req, res, next) {
    console.log("attempting to post...")
    var idea = {};

    idea.name = req.body.name;
    idea.room = req.params.room_id;
    idea.ownerName = req.user.socialData.name;
    idea.owner = req.user._id;

    // create promise for Idea.create method
    var createIdea = Q.nbind(Idea.create, Idea);

    // attempt to create the idea
    createIdea(idea)
      .then(function (createdIdea) {
        // if the idea is created send that object back
        if (createdIdea) {
          res.json(createdIdea);
        }
      })
      .fail(function (error) {
        console.log("this is an error")
        next(error);
      });
  },

  allIdeas: function(req, res, next) {
    // create promise for Idea.find
    var getIdeas = Q.nbind(Idea.find, Idea);
    var query = req.params.room_id ? { room: req.params.room_id } : undefined;
    // get all ideas
    console.log("query", query, req.params.room_id);
    getIdeas(query)
      .then(function(allIdeas) {
        // if there are ideas send them in response
        console.log("should not be here")
        if(allIdeas) {
          if (query){
            res.json(allIdeas);
          } else {
            var ideasCopy = allIdeas.slice();
            // how many words in the word cloud
            var limitIdeas;
            var max = ideasCopy.length;
            if (max > 50){
              limitIdeas = 25;
            } else {
              limitIdeas = 0;
            }
            var min = 0;
            // returns where we start getting words from the array
            var randNum = Math.floor(Math.random() * (max - limitIdeas - min + 1)) + min;
            var wordIdeas = ideasCopy.splice(randNum, limitIdeas);
            console.log("should be 10 ideas", wordIdeas.length, randNum, max, ideasCopy.length);
            res.json(wordIdeas);
          }
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  updateIdea: function(req, res, next) {
    //we convert the request objects into strings just to be safe(req.user._id was coming back as an object for some reason)
    var user = String(req.user._id)
    var ideaOwner = String(req.body.owner)

    //if user was not the originator of hte idea, throw an error
    if (user !== ideaOwner) {
      console.log('user not authorized to update this resource. sending back 401 Unauthorized')
      res.status(401)
    }

    // create promise for Idea.findById
    var findIdeaById = Q.nbind(Idea.findById, Idea);

    // attempt to find the idea by the id passed in
    findIdeaById(req.params.idea_id)
      .then(function(foundIdea) {
        // if the idea is found update the name and save
        if (foundIdea) {
          foundIdea.name = req.body.name;
          foundIdea.save(function(err) {
            if (err) {
              res.send(err);
            }
            res.json(foundIdea);
          });
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  deleteIdea: function(req, res, next) {
    console.log("trying to delete idea")
    //we convert the request objects into strings just to be safe(req.user._id was coming back as an object for some reason)
    var user = String(req.user._id)
    var ideaOwner = String(req.body.owner)

    //if user was not the originator of hte idea, throw an error
    if (user !== ideaOwner) {
      console.log('user not authorized to delete this resource. sending back 401 Unauthorized')
      res.status(401)
    }

    // create promise for Idea.remove method
    var removeIdea = Q.nbind(Idea.remove, Idea);
    // delete idea based on id passed in
    removeIdea({_id: req.params.idea_id})
      .then(function(removedIdea) {
        // if the idea has been removed, send success
        // and id to remove from IdeaStore
        if(removedIdea[1].ok) {
          res.json({
            message: 'Successfully deleted.',
            _id: req.params.idea_id
          });
        }
      })
      .fail(function(error) {
        next(error);
      });
  }
};
