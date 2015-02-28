var React = require("react");
var Room = require("./Room");
var RoomStore = require("../stores/RoomStore");
var IdeaStore = require("../stores/IdeaStore");
var Router = require('react-router');
var Navigation = Router.Navigation;

var Rooms = React.createClass({

  mixin:[Navigation],

  propTypes: {
    id : React.PropTypes.string ,
    name : React.PropTypes.string ,
    owner : React.PropTypes.object ,
    ownerName : React.PropTypes.string

  },

  getInitialState: function() {
    return {
      rooms: RoomStore.getAll()
    };
  },

  componentDidMount: function() {
    RoomStore.all();
    IdeaStore.all();
    RoomStore.addChangeListener(this._onChange);
  },

  _onChange: function(){
    if(this.isMounted()) {
      this.setState({ rooms: RoomStore.getAll() });
    }
  },

  componentWillUnmount: function(){
     RoomStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var rooms = [];
    this.state.rooms.forEach(function(room) {
      rooms.push(<Room name={room.name} ownerName={room.ownerName} owner={room.owner} key={room._id} _id={room._id} />);
    });
    return (
      <div className="rooms">
        { rooms }
      </div>
    );
  }
});

module.exports = Rooms;
