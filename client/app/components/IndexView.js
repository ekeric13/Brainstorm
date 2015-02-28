/**
 * Created by jared on 2/27/15.
 */
//var currentView;
//if(this.state.indexView) { //thisIsHomePage
//  currentView = (
//    <div>
//      <CreateRoom />
//      <Rooms />
//    </div>
//  );
var React = require("react");
var Router = require('react-router');
var Navigation = Router.Navigation;
var RouteHandler = Router.RouteHandler;
var UserStore = require("../stores/UserStore");

var IndexView = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return {
      currentUser: UserStore.get()
    }
  },

  componentDidMount: function(){
    UserStore.addChangeListener(this.onStoreChange);
  },

  onStoreChange: function() {
    var self = this;
    if(this.isMounted()) {
      this.setState({ currentUser: UserStore.get() });
    }
  },

  componentWillUnmount: function(){
    UserStore.removeChangeListener(this.onStoreChange);
  },


  componentDidUpdate: function(){
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

