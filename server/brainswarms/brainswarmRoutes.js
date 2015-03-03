var brainswarmController = require('./brainswarmController.js');

module.exports = function (app) {
  // Not sure what this means????

  // app === ideaRouter injected from middlware.js
  // the app has the '/ideas' path mounted for the ideaRouter
  // thus the root route here is actually '/ideas'

  app.route('/:idea_id')
    .post(brainswarmController.newBrainswarm)
    .get(brainswarmController.getBrainswarm);

  app.route('/:brainswarm_id')
    .put(brainswarmController.updateBrainswarm);
};
