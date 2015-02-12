app.CreateRoom = React.createClass({displayName: "CreateRoom",
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement(app.RoomCreateForm, null)
      )
    );
  }
});
