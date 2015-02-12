app.Room = React.createClass({displayName: "Room",
  getInitialState: function() {
    // set initial editing state to false
    return {
      displaying: true,
      editing: false,
      filtered: false,
      currentUser: app.UserStore.get()
    };
  },

  gotoRoom: function(e){
    e.preventDefault();
    app.PageActions.navigate({
      dest: 'rooms',
      props: this.props._id
    });
  },
  componentDidMount: function() {
    // add a change listener on the IdeaStore
    // this is needed when the edit comes back and emits a change
    // that will force the component to re-render
    app.IdeaStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({editing: false});
      }
    }.bind(this));


  },

  show: function () {
    if (this.isMounted()) {
      this.setState({ displaying: !this.state.displaying });
    }
  },

  render: function() {
    var roomContent;
    var editForm;
    var currentUser = this.state.currentUser
    var roomOwner = this.props.owner

    // console.log("This is the current user")
    // console.log(currentUser)
    // console.log("this is the room owner")
    // console.log(roomOwner);
    // if editing render edit form otherwise render "Edit Idea" button
    if (this.state.editing) {
      editForm = React.createElement(app.RoomCreateForm, {editing: "true", owner: this.props.owner, name: this.props.name, key: this.props._id, _id: this.props._id})
    }

    //if displaying form
    if (this.state.displaying && currentUser) {
      // if there is a current user and their id is the same as the roomOwner id, allow them to edit their own idea
      if (currentUser._id === roomOwner) {
        roomContent = (
          React.createElement("div", {className: "room pure-u-1"}, 
            React.createElement("a", {href: "#", onClick: this.gotoRoom}, this.props.name), 
            React.createElement("form", {className: "pure-form pure-g"}, 
                editForm
              ), 
            React.createElement("div", {className: "pure-u-1-1 auth-check"}, 
              React.createElement("button", {className: "button-small pure-button pure-button-primary", onClick: this.edit},  this.state.editing ? 'Cancel' : 'Edit Room'), 
              React.createElement("button", {className: "button-small pure-button pure-button-primary", onClick: this.delete}, "Delete Room")
            )

          )
        );
      }
      //othersise if they arent a current user of were'nt the originator of an idea, dont let them edit/delete it. just like or comment it
      else {
        roomContent = (
          React.createElement("div", {className: "room pure-u-1"}, 
            React.createElement("a", {href: "#", onClick: this.gotoRoom}, this.props.name)
          )
        );
      }
    }

    return (
      React.createElement("div", null, 
          roomContent
      )
    );
  },

  edit: function(e) {
    e.preventDefault();
    if (this.isMounted()) {
      this.setState({ editing: !this.state.editing });
    }
  },

  delete: function(e) {
    e.preventDefault();
    if (this.isMounted()) {
      app.RoomActions.delete({ id: this.props._id, owner: this.props.owner });
    }
  }
});