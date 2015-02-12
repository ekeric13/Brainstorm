app.Ideas = React.createClass({displayName: "Ideas",
  getInitialState: function () {
    return {
      ideas: app.IdeaStore.getAll()
    };
  },

  pauseUpdates: false,

  componentDidMount: function () {
    app.IdeaStore.addChangeListener(function() {
      if(this.isMounted()) {
        if(!app.Ideas.pauseUpdates){
          this.setState({ ideas: app.IdeaStore.getAll() });
        }
      }
    }.bind(this));
    // get all ideas from db
  },

  render: function() {
    var ideas = [];
    var that = this;
    // create all idea components
    this.state.ideas.forEach(function(idea) {
      if (idea.name.toLowerCase().indexOf(that.props.filterText.toLowerCase()) !== -1)
        if (idea.ownerName.toLowerCase().indexOf(that.props.filterNames.toLowerCase()) !== -1)
          ideas.push(React.createElement(app.Idea, {name: idea.name, ownerName: idea.ownerName, owner: idea.owner, room: idea.room, key: idea._id, _id: idea._id}));
    });
    return (

      React.createElement("div", {ref: "body"}, 
        ideas 
      )
    );
  }
})
