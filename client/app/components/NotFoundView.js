var React = require("react");

var NotFoundView = React.createClass({
  render: function() {
    return (
      <div>
        <h1> We could not found your route </h1>
      </div>
    )
  }
});

module.exports = NotFoundView;
