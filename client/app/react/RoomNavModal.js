app.RoomNavModal = React.createClass({displayName: "RoomNavModal",

  render:function(){
    return (
      React.createElement("div", {ref: "body"}, 
        React.createElement("h1", null, this.props.name), 
        React.createElement("a", {ref: "room", onClick: this.props.handleClick}, "http://localhost/_/rooms/", this.props.roomId)
      )
    );
  }

});
