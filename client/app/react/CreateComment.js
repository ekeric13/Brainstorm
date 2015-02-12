app.CreateComment = React.createClass({displayName: "CreateComment",
  render: function(){
    return (
      React.createElement("div", {ref: "body"}, 
        React.createElement(app.CommentForm, {idea_id: "5487b6bcd45728763106ce12"})
      )
    );
  }
});
