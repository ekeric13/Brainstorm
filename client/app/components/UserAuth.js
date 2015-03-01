var React = require("react");
var UserActions = require("../actions/UserActions");
var UserStore = require("../stores/UserStore");
var Router = require("react-router");
var Navigation = Router.Navigation;
var Reflux = require("reflux");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var UserAuth = React.createClass({

  mixins: [Navigation, Reflux.ListenerMixin, PureRenderMixin],

  getInitialState: function() {
    return { currentUser: UserStore.get() };
  },

  handleClick: function(e) {
    if(this.state.currentUser) {
      e.preventDefault();
      var self = this;
      UserActions.logout(function(){
        self.transitionTo('/');
      });

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
    this.listenTo(UserStore, this.onStoreChange);
    UserActions.getCurrentUser();
  },

  onStoreChange: function(){
    if(this.isMounted()) {
      this.setState({ currentUser: UserStore.get() });
    }
  }


});

module.exports = UserAuth;
