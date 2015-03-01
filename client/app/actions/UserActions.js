var Reflux = require("reflux");

var UserActions = Reflux.createActions([
  "getCurrentUser",
  "logout"

]);

module.exports = UserActions;
