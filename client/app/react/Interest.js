app.Interest = React.createClass({displayName: "Interest",
  _liked: false,

  checkLiked: function (interests) {
    this._liked = false;
    var currentUser = app.UserStore.get();
    if (currentUser){
      interests.forEach(function (interest) {
        if (interest.owner === currentUser._id){
          this._liked = interest._id;
        }
      }.bind(this));
    }
  },

  getInitialState: function () {
    var interests = app.InterestStore.getAll(this.props.idea_id);
    this.checkLiked(interests);
    return {
      interests: interests
    };
  },

  handleClick: function (e) {
    e.preventDefault();
    if (this._liked){
      app.InterestActions.delete(this._liked);
    } else {
      app.InterestActions.create(this.props.idea_id);
    }
  },

  componentDidMount: function () {
    app.InterestStore.addChangeListener(function () {
      if(this.isMounted()) {
        var interests = app.InterestStore.getAll(this.props.idea_id);
        this.checkLiked(interests);
        this.setState({ interests: interests });
      }
    }.bind(this));
  },

  render: function () {
    var interestCount = this.state.interests.length;
    return (
      React.createElement("div", {className: "likes", ref: "body"}, 
        React.createElement("button", {className: "button-small pure-button", onClick: this.handleClick}, this._liked ? 'UnLike' : 'Like'), 
        React.createElement("span", null, " ", interestCount, " Likes")
      )
    );
  }

});
