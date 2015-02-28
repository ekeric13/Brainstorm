var React = require("react");
var UserStore = require("../stores/UserStore");
var Router = require("react-router");
var Navigation = Router.Navigation;

var UserAuth = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return { currentUser: UserStore.get() };
  },

  handleClick: function(e) {
    if(this.state.currentUser) {
      e.preventDefault();
      this.transitionTo('/')
      UserStore.logout();

    }
  },

  render: function(){
    var text = this.state.currentUser ? 'Logout' : 'Login';
    return (
      <div>
          <li><a onClick={this.handleClick} href='/auth/github'>{text}</a></li>
          <li><a onClick={this.handleClick} href='/auth/github'>Github</a></li>
          <li><a onClick={this.handleClick} href='/auth/facebook'>Facebook</a></li>
          <li><a onClick={this.handleClick} href='/auth/google'>Google</a></li>
      </div>
    );
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this.onStoreChange);
    UserStore.getCurrentUser();
  },

  onStoreChange: function(){
    if(this.isMounted()) {
      this.setState({ currentUser: UserStore.get() });
    }
  }

  // componentWillUnmount: function() {
  //   UserStore.removeChangeListener(this.onStoreChange);
  // }

});

module.exports = UserAuth;
