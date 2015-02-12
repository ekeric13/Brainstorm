app.RoomTitle = React.createClass({displayName: "RoomTitle",
  getInitialState: function() {
    return {
      room:
      _(app.RoomStore.getAll()).filter(function (room) {
        return room._id === this.props.room_id;
      },this)[0]
    };
  },

  componentDidMount: function() {
    app.RoomStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({ room:
          _(app.RoomStore.getAll()).filter(function (room) {
            return room._id === this.props.room_id;
          },this)[0]
        });
      }
    }.bind(this));
    app.RoomStore.all();
  },

  render: function() {
    var title;
    if (this.state.room){
      title = (React.createElement("h1", null,  this.state.room.name))
    }

    return (
      React.createElement("div", {className: "room"}, 
        title
      )
    );
  }
})
