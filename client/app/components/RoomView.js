var React = require("react");
var Router = require("react-router");
var RoomTitle = require("./RoomTitle");
var IdeaForm = require("./IdeaForm");
var SearchBar = require("./SearchBar");
var Ideas = require("./Ideas");
var IdeaStore = require("../stores/IdeaStore");
var State = Router.State;

var RoomView = React.createClass({

  mixins: [ State ],

  getInitialState: function() {
    return {
      filterText: '',
      filterNames: ''
    }
  },

  componentDidMount: function() {
    IdeaStore.setRoom(this.getParams().roomId);
  },

  handleUserInput: function(filterText, filterNames) {
      this.setState({
          filterText: filterText,
          filterNames: filterNames
      });
  },

  render: function(){
    var roomId = this.getParams().roomId;
    console.log("params", roomId);

    return(
    <div>
       <RoomTitle room_id={roomId}/>
       <IdeaForm room_id={roomId}/>
       <SearchBar
         filterText={this.state.filterText}
         filterNames={this.state.filterNames}
         onUserInput={this.handleUserInput}
        />
      <div className="idea-whiteboard">
        <Ideas room_id={roomId}
         filterText={this.state.filterText}
         filterNames={this.state.filterNames}
        />
       </div>
    </div>
    )
  }

});

module.exports = RoomView;
