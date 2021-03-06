var React = require("react");
var Idea = require("./Idea");
var IdeaStore = require("../../../stores/IdeaStore");
var IdeaActions = require("../../../actions/IdeaActions");
var UserStore = require("../../../stores/UserStore");
var Draggable = require('react-draggable');
var socket = io();

var Reflux = require("reflux");

React.initializeTouchEvents(true);

var Ideas = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    room_id: React.PropTypes.string,
    filterText: React.PropTypes.string,
    filterNames: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      ideas: IdeaStore.getAll(),
      currentUser: UserStore.get()
    };
  },

  pauseUpdates: false,

  componentDidMount: function () {
    socket.emit('join ideaRoom',this.props.room_id);
    IdeaActions.get(this.props.room_id);
    this.listenTo(IdeaStore, this.onStoreChange);
  },

  componentWillUnmount: function(){
    //leave room on server
    socket.emit('leave ideaRoom',this.props.room_id);
  },


  onStoreChange: function(data){
    var self = this;
    if(this.isMounted()) {
      if(!self.pauseUpdates){
        this.setState({ ideas: IdeaStore.getAll() });
      }
    }
  },



  render: function() {
    var ideas = [];
    var self = this;
    // create all idea components
    this.state.ideas.forEach(function(idea) {
      if (idea.name.toLowerCase().indexOf(self.props.filterText.toLowerCase()) !== -1)
        if (idea.ownerName.toLowerCase().indexOf(self.props.filterNames.toLowerCase()) !== -1)
          ideas.push(<Idea name={idea.name} ownerName={idea.ownerName} owner={idea.owner} room={idea.room} key={idea._id} _id={idea._id} position={idea.position}/>);
    });
    return (

    <div className="container">
      <div className="stickyNotes">
        { ideas }
      </div>
      <br/>
      <br/>
      <img className="expo-marker" src="/styles/assets/expo-marker.jpg" />
    </div>
    );
  }
});

module.exports = Ideas;
