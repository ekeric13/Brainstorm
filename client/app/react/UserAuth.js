app.UserAuth = React.createClass({displayName: "UserAuth",
  getInitialState: function() {
    return { currentUser: app.UserStore.get() };
  },

  handleClick: function(e) {
    if(this.state.currentUser) {
      e.preventDefault();
      app.UserStore.logout();
    }
  },

  render: function(){
    var text = this.state.currentUser ? 'Logout' : 'Login';
    return (
      React.createElement("div", null, 
        React.createElement("a", {className: "pure-button pure-button-primary", onClick: this.handleClick, href: "/auth"}, text)
      )
    );
  },

  componentDidMount: function() {
    app.UserStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({ currentUser: app.UserStore.get() });
      }
    }.bind(this));
    app.UserStore.getCurrentUser();
  }

});
