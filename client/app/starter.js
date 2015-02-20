var React = require("react");
var BrainstormApp = require("./components/BrainstormApp");
var PageActions = require("./actions/PageActions");
var BrainswarmStore = require("./stores/BrainswarmStore");
var socket = io.connect();

React.render(
  <BrainstormApp />,
  document.getElementById('main')
);



if (document.location.hash.substr(3, 5) === 'rooms'){
  PageActions.navigate({

    dest: 'rooms',
    props: document.location.hash.substr(9)

  });
} else {
  PageActions.navigate({

    dest: 'welcome'

  });
};

window.addEventListener ('popstate' , function (event) {
  console.log ('HISTORY' , window.history)
  var path = event.state.path.slice (1);
  var pathParts = path.split ('/');

  if (pathParts[0] === 'brainswarms') {

    BrainswarmStore.visitBrainswarm (pathParts[1]);
  }
  PageActions.navigate ({
    dest : pathParts[0] ,
    data : pathParts[1]
  });

});

// possibly add a brainswarm in here for when user opens app on a brainswarm url
