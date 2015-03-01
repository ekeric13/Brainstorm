var React = require("react");
var CommentForm = require("./CommentForm");
var UserStore = require("../../../stores/UserStore");
var CommentActions = require("../../../actions/CommentActions");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Comment = React.createClass({

  propTypes: {
    editing: React.PropTypes.bool,
    name: React.PropTypes.string,
    _id: React.PropTypes.string
  },

  mixins: [PureRenderMixin],

  getInitialState: function() {
    // set initial editing state to false
    return {
      editing: false,
      currentUser: UserStore.get()
    };
  },

  componentWillReceiveProps: function() {
    // remove the editing parameter when the view updates
    this.setState({editing: false});
  },

  render: function() {
    var editForm;
    var commentContent;
    // if editing render edit form otherwise render "Edit Idea" button
    if (this.state.editing) {
      editForm = <CommentForm editing={this.state.editing} name={this.props.name} key={this.props._id} _id={this.props._id} />
    }
    if (this.props.anchor){
      commentContent = (

          <h5>{this.props.ownerName}: <a href={this.props.name} target="_blank">{this.props.name}</a></h5>

      );
    } else {
      commentContent = (
        <h5>{this.props.ownerName}: {this.props.name}</h5>
      );
    }

    return (
      <div>
        {commentContent}
        <form className="pure-form formEditComment" >
          {editForm}
          <button className="pure-button" onClick={this.edit}>{ this.state.editing ? 'Cancel' : 'Edit Comment'}</button>
          <button className="pure-button" onClick={this.delete}>Delete Comment</button>
        </form>
      </div>
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
      CommentActions.delete(this.props._id);
    }
  }
});

module.exports = Comment;
