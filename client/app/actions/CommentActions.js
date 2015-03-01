var Reflux = require("reflux");

var CommentActions = Reflux.createActions([
  "get",
  "create",
  "edit",
  "delete"
]);

module.exports = CommentActions;
