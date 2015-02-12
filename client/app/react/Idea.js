app.Idea = React.createClass({displayName: "Idea",
  getInitialState: function() {
    // set initial editing state to false
    return {
      displaying: true,
      editing: false,
      filtered: false,
      currentUser: app.UserStore.get()
    };
  },

  componentDidMount: function() {
    // add a change listener on the IdeaStore
    // this is needed when the edit comes back and emits a change
    // that will force the component to re-render
    // app.IdeaStore.addChangeListener(function() {
    //   if(this.isMounted()) {
    //     this.setState({editing: false});
    //   }
    // }.bind(this));


  },

  show: function () {
    if (this.isMounted()) {
      this.setState({ displaying: !this.state.displaying });
    }
  },

  render: function() {
    var ideaContent;
    var editForm;
    var currentUser = this.state.currentUser
    var ideaOwner = this.props.owner

    // if editing render edit form otherwise render "Edit Idea" button
    if (this.state.editing) {

      app.Ideas.pauseUpdates = true;

      editForm = React.createElement(app.IdeaForm, {editing: "true", owner: this.props.owner, name: this.props.name, key: this.props._id, _id: this.props._id})

    }

    //if displaying form
    if (this.state.displaying && currentUser) {
        app.Ideas.pauseUpdates = false;
      // if there is a current user and their id is the same as the ideaOwner id, allow them to edit their own idea
      if (currentUser._id === ideaOwner) {
        ideaContent = (
          React.createElement("div", {className: "idea"}, 

            React.createElement("form", {className: "pure-form pure-g"}, 
              React.createElement("div", {className: "pure-u-1-1 pure-u-sm-2-3"}, 
                React.createElement("h2", {ref: "body"}, this.props.ownerName, ": ", this.props.name), 
                editForm
              ), 

              React.createElement("div", {className: "auth-check pure-u-1-1 pure-u-sm-1-3 watch"}, 
                React.createElement(app.Interest, {idea_id: this.props._id})
              ), 
              React.createElement("div", {className: "pure-u-1-1 auth-check"}, 
                React.createElement("button", {className: "button-small pure-button pure-button-primary", onClick: this.edit},  this.state.editing ? 'Cancel' : 'Edit Idea'), 
                React.createElement("button", {className: "button-small pure-button pure-button-primary", onClick: this.delete}, "Delete Idea")
              ), 

              React.createElement("div", {className: "pure-u-1-1 auth-check comments"}, 
                React.createElement(app.Comments, {idea_id: this.props._id})
              )

            )

          )
        );
      }
      //othersise if they arent a current user of were'nt the originator of an idea, dont let them edit/delete it. just like or comment it
      else {
        ideaContent = (
          React.createElement("div", {className: "idea"}, 

            React.createElement("form", {className: "pure-form pure-g"}, 
              React.createElement("div", {className: "pure-u-1-1 pure-u-sm-2-3"}, 
                React.createElement("h2", {ref: "body"}, this.props.ownerName, ": ", this.props.name), 
                editForm
              ), 

              React.createElement("div", {className: "auth-check pure-u-1-1 pure-u-sm-1-3 watch"}, 
                React.createElement(app.Interest, {idea_id: this.props._id})
              ), 
              React.createElement("div", {className: "pure-u-1-1 auth-check comments"}, 
                React.createElement(app.Comments, {idea_id: this.props._id})
              )
            )

          )
        );
      }
    }

    return (
      React.createElement("div", null, 
        ideaContent
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
      app.IdeaActions.delete({ id: this.props._id, owner: this.props.owner });
    }
  }
});


//COMMAND TO POST IDEA ON BEHALF OF FAKE USER (DEVEVELOPMENT PURPOSES ONLY)
// curl -H "Content-Type: application/json" -d '{"name":"theyll never catch me in this fox hole!","ownerName":"Saddam Hussein","room_id":"548a38cebcf20d5101e0e13c"}' http://localhost:3000/ideas/548a38cebcf20d510

