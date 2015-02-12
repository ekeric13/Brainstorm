app.Rooms = React.createClass({displayName: "Rooms",
  getInitialState: function() {
    return {
      rooms: app.RoomStore.getAll()
    };
  },

  componentDidMount: function() {
    app.RoomStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({ rooms: app.RoomStore.getAll() });
      }
    }.bind(this));
    app.RoomStore.all();
  },

  render: function() {
    var rooms = [];
    this.state.rooms.forEach(function(room) {
      rooms.push(React.createElement(app.Room, {name: room.name, ownerName: room.ownerName, owner: room.owner, key: room._id, _id: room._id}));
    });
    return (
      React.createElement("div", {className: "rooms"}, 
        rooms 
      )
    );
  }
})