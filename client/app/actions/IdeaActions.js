var Reflux = require("reflux");

var IdeaActions = Reflux.createActions([
  "create",
  "edit",
  "get",
  "delete",
  "all"
]);

module.exports = IdeaActions;
