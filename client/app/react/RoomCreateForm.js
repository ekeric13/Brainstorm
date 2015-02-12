app.RoomCreateForm = React.createClass({displayName: "RoomCreateForm",
  // handleSubmit: function(e) {
  //   e.preventDefault();

  //   var roomName = this.refs.name.getDOMNode();

  //   app.RoomActions.create(roomName.value.trim());
  //   roomName.value = '';
  //   return;
  // },
  handleSubmit: function(e) {
    e.preventDefault();

    var name = this.refs.name.getDOMNode();



    // if editing send info to edit method in IdeaActions
    if (this.props.editing) {
      // console.log('wtf')
      // debugger
      var room = {id: this.props._id};
      room.owner = this.props.owner;
      room.name = name.value.trim();
      app.RoomActions.edit(room);
    } else { // else an idea is being created
      app.RoomActions.create(name.value.trim());
    }
    // clear the value in the input
    name.value = '';
    return;
  },

  render: function(){
    return (
      React.createElement("form", {className: "auth-check pure-form pure-g", ref: "form", onSubmit: this.handleSubmit}, 
        React.createElement("input", {className: "pure-u-1-1 pure-u-sm-5-6 postfix", type: "text", ref: "name", defaultValue: this.props.name, placeholder: "Create a Room"}), 
        React.createElement("button", {className: "pure-u-1-1 pure-u-sm-1-6 button-small pure-button pure-button-primary no-margin", type: "submit", ref: "submit"}, this.props.editing ? "Edit Idea" : "Create")
      )
    );
  }
});
