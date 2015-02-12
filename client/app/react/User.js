app.User = React.createClass({displayName: "User",
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement(app.UserAuth, null)
      )
    );
  }
});
