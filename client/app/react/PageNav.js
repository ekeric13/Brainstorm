app.PageNav = React.createClass({displayName: "PageNav",

  handleWelcome:function(){
    //dispatch a navigate to welcome on click
    app.PageActions.navigate({
      dest: 'welcome'
    });
  },

  render:function(){
    return (
      React.createElement("header", {className: "pure-g", ref: "body"}, 
        React.createElement("div", {className: "pure-u-1-2"}, 
          React.createElement("button", {className: "pure-button", ref: "welcome", onClick: this.handleWelcome}, "Home")
        ), 
        React.createElement("div", {className: "login pure-u-1-2"}, 
          React.createElement(app.User, null)
        )
      )
    );
  }

});
