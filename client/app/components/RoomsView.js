var React = require("react");
var RoomCreateForm = require("./RoomCreateForm");
var Rooms = require("./Rooms");

var RoomsView = React.createClass({
  render: function() {
    return (
      <div>
        <RoomCreateForm />
        <Rooms />
      </div>
    )
  }
});

module.exports = RoomsView;
