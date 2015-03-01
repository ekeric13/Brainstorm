var React = require("react");
var IdeaForm = require("./IdeaForm");
var Ideas = require("./Ideas");
var Interest = require("./Interest");
var Comments = require("./Comments");
var UserStore = require("../stores/UserStore");
var IdeaStore = require("../stores/IdeaStore");
var IdeaActions = require("../actions/IdeaActions");
var BrainswarmStore = require("../stores/BrainswarmStore");
var BrainswarmActions = require("../actions/BrainswarmActions");
var Q = require('q');
var Draggable = require('react-draggable');
var socket = io();
//var $ = require('jquery');
var ConfirmationBox = require("./confirmationBox");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;



var Idea = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
      id: React.PropTypes.string,
      idea: React.PropTypes.string,
      name: React.PropTypes.string,
      owner: React.PropTypes.string,
      ownerName: React.PropTypes.string
  },

  getInitialState: function() {
    // set initial editing state to false
    return {
      displaying: true,
      editing: false,
      filtered: false,
      currentUser: UserStore.get(),
      deleteIdea: false
    };
  },

  componentDidUpdate: function(){

    if(this.state.deleteIdea){
      var mod = $('#modal1').openModal();
    }
  },

  componentDidMount: function() {
    // add a change listener on the IdeaStore

   // console.log ("THIS IS STATE",this.state);
    // this is needed when the edit comes back and emits a change
    // that will force the component to re-render
    //app.IdeaStore.addChangeListener(function() {
    //   if(this.isMounted()) {
    //     this.setState({editing: false});
    //   }
    //}.bind(this));
    var self = this;
    var ideaId = self.props._id;
    var selectz = '#'+ ideaId;

    var node =  $(selectz);

    //might need to look into offset to make correct location calculation
   //var offset =  node.offset()
   //  console.log("THS IS OFFSET",offset)

      //tried using css to set location, or translate to it
   // node.css({position: "relative", left: this.props.position.left+"px", top: this.props.position.top+"px"});
    //node.css({"-webkit-transform":"translate("+ this.props.position.left+"px,"+ this.props.position.top+"px)"});

    socket.on('edit location', function(data){
      var ideaId = self.props._id;

       if(data.id === ideaId) {

     // self.updatePosition(data.ui);
      node.css({"-webkit-transform":"translate("+ data.ui.left+"px,"+ data.ui.top+"px)"});

       }
    });


  },
  componentWillUnmount: function(){
    //saving coordinates when leaving room
    this.props.position = this.state.position;
    var idea = this.props;
     idea.id = this.props._id;
    IdeaStore.edit(idea)
  },

  show: function () {
    if (this.isMounted()) {
      this.setState({ displaying: !this.state.displaying });
    }
  },
  handleStart: function (event, ui) {
   // console.log('Event: ', event);
    //console.log('Position: ', ui.position);
  },
  handleDrag: function (event, ui) {
    var obj = {};

    obj.ui = ui.position;
    obj.id = this.props._id;

    socket.emit('idea change', obj);
  },
  handleStop: function (event, ui) {

    this.setState({position: {top: event.clientY, left:event.clientX}});

  },

  render: function() {
    var ideaContent;
    var editForm;
    var currentUser = this.state.currentUser;
    var ideaOwner = this.props.owner;
    var cssSelector = this.props._id;
    var confirmBox;

    // if editing render edit form otherwise render "Edit Idea" button
    if (this.state.editing) {

      Ideas.pauseUpdates = true;

      editForm = <IdeaForm editing="true" owner={this.props.owner} name={this.props.name} key={this.props._id} _id={this.props._id} />

    }

    //if displaying form
    if (this.state.displaying && currentUser) {
        Ideas.pauseUpdates = false;
      // if there is a current user and their id is the same as the ideaOwner id, allow them to edit their own idea
      // othersise if they arent a current user of were'nt the originator of an idea, dont let them edit/delete it. just like or comment it
      var editableOption = (<span></span>);
      if (currentUser._id === ideaOwner) {
        editableOption = (
              <div className="auth-check" style={{display:"inline"}}>
                <button className="fa fa-trash-o" style={{paddingRight:"30px"}}  onClick={this.delete}></button>
                <button className="fa fa-pencil-square-o" style={{paddingRight:"30px"}} onClick={this.edit}> { this.state.editing ? 'Cancel' : ''} </button>
              </div>
          )
      }
      if(this.state.deleteIdea){
        confirmBox = <ConfirmationBox name={this.props.name} id={this.props._id} owner={this.props.owner}/>
      }

    ideaContent = (

      <div className="idea" id ={cssSelector}>
        <div>
          {confirmBox}
          </div>
        <Draggable onStart={this.handleStart} onDrag={this.handleDrag} onStop={this.handleStop}>
        <div className="anchor">

          <form>
            <div>
              <div className="ideaDescription" style={{fontSize:"20px"}} ref="body">{this.props.name}</div>
            </div>

            <div className="ideaFooter">
                <span>{this.props.ownerName}</span>

                <div className="auth-check watch" style={{display:"inline"}}>
                  <Interest idea_id={this.props._id} />
                </div>

              <button className="brainSwarm no-margin btn waves-effect waves-light" style={{display:"inline", height: "25px", backgroundColor: "#64b5f6", marginTop: "10px"}} onClick={this.brainswarm}>Brainswarm</button>
              <div>
                {editForm}
                {editableOption}
                <div className="auth-check comments" style={{display:"inline"}}>
                  <Comments idea_id={this.props._id} />
                </div>
              </div>

            </div>


          </form>
        </div>
      </Draggable>
      </div>


    )}

    return (ideaContent);
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
      this.setState({ deleteIdea: !this.state.deleteIdea });
    }
  },

  brainswarm: function(e) {
    e.preventDefault();

    var name = this.props.name;
    var brainswarmName = name + "_brainswarm";
    // var brainswarm = BrainswarmStore.checkBrainswarm(this.props._id);
    // if (!brainswarm){
    //   var brainswarm = BrainswarmStore.getBrainswarm(this.props._id);
    // }
    // if (brainswarm){
    //   // get a specific brainstorm
    //   // REFACTOR TO USE AN ACTION
    //   console.log("going to previous brainswarm");
    //   BrainswarmStore.visitBrainswarm(brainswarm._id);
    // } else {
    //   BrainswarmActions.create(this.props._id, brainswarmName);
    // }
    var that = this;
    BrainswarmStore.checkBrainswarm(this.props._id, function(brainswarm){
      if (brainswarm){
        BrainswarmStore.visitBrainswarm(brainswarm._id);
      } else {
        BrainswarmStore.getBrainswarm(that.props._id, function(brainswarmData){
          if (brainswarmData) {
            BrainswarmStore.visitBrainswarm(brainswarmData._id);
          } else {
            BrainswarmActions.create(that.props._id, brainswarmName);
          }
        });
      }
    });
  }
});

module.exports = Idea;

//COMMAND TO POST IDEA ON BEHALF OF FAKE USER (DEVEVELOPMENT PURPOSES ONLY)
// curl -H "Content-Type: application/json" -d '{"name":"theyll never catch me in this fox hole!","ownerName":"Saddam Hussein","room_id":"548a38cebcf20d5101e0e13c"}' http://localhost:3000/ideas/548a38cebcf20d510

