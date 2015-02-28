var React = require("react");
var Router = require('react-router');
var PageNav = require("./PageNav");
var UserStore = require("../stores/UserStore");
var About = require("./About");

var RouteHandler = Router.RouteHandler;

var BrainstormApp = React.createClass({

  propTypes: {

    filterText: React.PropTypes.string,
    filterNames:React.PropTypes.string
    // room_id: React.PropTypes.string

  },


  getInitialState: function() {
    return {
      currentUser: UserStore.get(),
      filterText: '',
      filterNames: ''
    };
  },

  componentDidMount: function () {
    window.globalBoolean = true;
    UserStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({ currentUser: UserStore.get() });
      }
    }.bind(this));

   /* PageStore.addChangeListener(function(){

      //get state from the PageStore.currentRoute
      var state = PageStore.currentRoute;

      //if props is undefined set it to empty string
      state.props = state.props || '';
      state.indexView = (state.dest === 'welcome' ? true : false);
      state.roomView = (state.dest === 'rooms' ? true : false);
      state.aboutView = (state.dest === 'about' ? true : false);
      if (state.dest === 'rooms'){
        setTimeout(function () {
          PageActions.getRoomData(state.props);
        }, 0);
      } else if (state.dest === 'brainswarms') {
        setTimeout(function () {
          PageActions.getBrainswarmData(state.props);
        }, 0);
      }
      this.setState(state);

      if(!state.indexView && !state.roomView && !state.aboutView) {
        socket.emit('join-brainswarm', state.props);
      } else if (!state.indexView && !state.aboutView) {
        socket.emit('join', state.props);
      }
    }.bind(this));*/
  },

  render: function(){


    /* currentView = (
      <div>
        <Brainswarm _id={this.state.props}/>

      </div>
     );
    }*/

    return (
      <div>
        <PageNav />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = BrainstormApp;
