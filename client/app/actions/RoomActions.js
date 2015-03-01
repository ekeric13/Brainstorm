var Reflux = require("reflux");

var RoomActions = Reflux.createActions([
  "create",
  "edit",
  "delete",
  "all"
]);

module.exports = RoomActions;
