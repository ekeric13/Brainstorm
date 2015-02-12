app.Filters = React.createClass({displayName: "Filters",
  getInitialState: function () {

    return {
      show: true
    };
  },


  render: function() {

    var owners = [];
    var filters = []


    this.props.ideas.forEach(function(idea) {

      console.log(idea);

      if (owners.indexOf(idea.props.owner) < 0){

        owners.push(idea.props.owner);

        filters.push(React.createElement(app.Filter, {ownerName: idea.props.ownerName, owner: idea.props.owner}));

      }

    });

    return (
      React.createElement("div", {ref: "filters"}, 

        "FILTER BY NAME", 

        filters

      )
    );
  }
})
