var React = require("react");
var Router = require('react-router');
var Navigation = Router.Navigation;
var UserAuth = require("./UserAuth");
var PageActions = require("../actions/PageActions");
var UserStore = require("../stores/UserStore");
var Link = Router.Link;

var PageNav = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    return {
      currentUser: UserStore.get()
    };
  },

  componentDidMount: function(){
    UserStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({ currentUser: UserStore.get() });
      }
    }.bind(this));
  },

  handleWelcome:function(){
    //dispatch a navigate to welcome on click
    if (this.state.currentUser){
      this.transitionTo('/rooms')
    } else {
      this.transitionTo('/')
    }
  },

  handleAbout:function(){
    //dispatch a navigate to about on click
    this.transitionTo('/about')
  },

  render:function(){
    return (
      <div>
        <header>
          <nav>
            <div className="nav-wrapper  blue darken-3">
              <ul className="login right">
                <UserAuth />
              </ul>
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li>
                  <div style={{paddingLeft:"10px", paddingRight:"10px"}} onClick={this.handleWelcome}>Brainstormer</div>
                </li>
                <li>
                  <Link to="about" style={{paddingLeft:"10px", paddingRight:"10px"}}>
                    Getting Started
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }

});

module.exports = PageNav;
