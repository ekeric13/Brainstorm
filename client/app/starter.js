var React = require("react");
var BrainstormApp = require("./components/BrainstormApp");
var About = require("./components/About");
var IndexView = require("./components/IndexView");
var RoomsView = require("./components/RoomsView");
var RoomView = require("./components/RoomView");
var Brainswarm = require("./components/Brainswarm");
var NotFoundView = require("./components/NotFoundView");
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route name="brainstormApp" path="/" handler={BrainstormApp}>
    <Route name="about" path="/about" handler={About}/>
    <Route name="roomsView" path="/rooms" handler={RoomsView} />
    <Route name="roomView" path="/rooms/:roomId" handler={RoomView}/>
    <Route name="brainswarm" path="/brainswarms/:brainswarmId" handler={Brainswarm}/>
    <DefaultRoute handler={IndexView}/>
    <NotFoundRoute handler={NotFoundView} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});

//pay attention to rooms id

// if (document.location.hash.substr(3, 5) === 'rooms'){
//   PageActions.navigate({

//     dest: 'rooms',
//     props: document.location.hash.substr(9)

//   });
// } else {
//   PageActions.navigate({

//     dest: 'welcome'

//   });
// };

// window.addEventListener ('popstate' , function (event) {
//   console.log ('HISTORY' , window.history)
//   var path = event.state.path.slice (1);
//   var pathParts = path.split ('/');

//   if (pathParts[0] === 'brainswarms') {

//     BrainswarmStore.visitBrainswarm (pathParts[1]);
//   }
//   PageActions.navigate ({
//     dest : pathParts[0] ,
//     data : pathParts[1]
//   });

// });

// possibly add a brainswarm in here for when user opens app on a brainswarm url
