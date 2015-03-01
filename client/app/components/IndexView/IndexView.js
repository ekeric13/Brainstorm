var React = require("react");
var Router = require('react-router');
var Navigation = Router.Navigation;
var Reflux = require("reflux");
var UserStore = require("../../stores/UserStore");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var IndexView = React.createClass({

  mixins: [Navigation, Reflux.ListenerMixin, PureRenderMixin],

  getInitialState: function() {
    return {
      currentUser: UserStore.get()
    }
  },

  componentDidMount: function(){
    this.listenTo(UserStore, this.onStoreChange);
  },

  onStoreChange: function(user) {
    console.log("user store changed");
    console.log("user is here", user);
    var self = this;
    if(this.isMounted()) {
      this.setState({ currentUser: UserStore.get() });
    }
 },

  componentDidUpdate: function(){
    console.log("updated component", this.state.currentUser);
    if(this.state.currentUser){
      this.transitionTo('/rooms')
    }
  },


  render: function() {
    return (
      <div>
        <div id="hero" ref="hero">
          <img className="hero-img" src="styles/assets/stickynotebackground.jpg"/>
          <span className="hero-text">BRAINSTORMER</span>
          <span className="hero-tagline">Ideation + Innovation</span>
        </div>
      </div>
    )
  }
});

module.exports = IndexView;

