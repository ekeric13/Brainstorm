app.Comment = React.createClass({displayName: "Comment",
  getInitialState: function() {
    // set initial editing state to false
    return {
      editing: false,
      currentUser: app.UserStore.get()
    };
  },

  componentWillReceiveProps: function() {
    // remove the editing parameter when the view updates
    this.setState({editing: false});
  },

  render: function() {
    var editForm;
    // if editing render edit form otherwise render "Edit Idea" button
    if (this.state.editing) {
      editForm = React.createElement(app.CommentForm, {editing: this.state.editing, name: this.props.name, key: this.props._id, _id: this.props._id})
    }

    return (
      React.createElement("div", null, 
        React.createElement("h5", {ref: "body"}, this.props.ownerName, ": ", this.props.name), 
        React.createElement("form", {className: "pure-form formEditComment"}, 
          editForm, 
          React.createElement("button", {className: "pure-button", onClick: this.edit},  this.state.editing ? 'Cancel' : 'Edit Comment'), 
          React.createElement("button", {className: "pure-button", onClick: this.delete}, "Delete Comment")
        )
      )
    );
  },

  edit: function(e) {
    e.preventDefault();
    if (this.isMounted()) {
      this.setState({editing: !this.state.editing});
    }
  },

  delete: function(e) {
    e.preventDefault();
    if(this.isMounted()) {
      app.CommentActions.delete(this.props._id);
    }
  }
});
