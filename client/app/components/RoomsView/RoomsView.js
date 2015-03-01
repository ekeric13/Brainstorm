var React = require("react");
var RoomCreateForm = require("./RoomsViewComponents/RoomCreateForm");
var Rooms = require("./RoomsViewComponents/Rooms");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var RoomsView = React.createClass({

  mixins: PureRenderMixin,

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
