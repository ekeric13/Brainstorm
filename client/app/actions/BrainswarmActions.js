var Reflux = require("reflux");

var BrainswarmActions = Reflux.createActions([
  'create',
  'edit',
  'getBrainswarm',
  'getBrainswarmById'
]);

module.exports = BrainswarmActions;
