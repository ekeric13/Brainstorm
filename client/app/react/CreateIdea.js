app.CreateIdea = React.createClass({displayName: "CreateIdea",
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement(app.IdeaForm, {room_id: this.props.room_id})
      )
    );
  }
});
