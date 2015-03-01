var React = require("react");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var NotFoundView = React.createClass({

  mixins: PureRenderMixin,

  render: function() {
    return (
      <div>
        <h1> We could not found your route </h1>
      </div>
    )
  }
});

module.exports = NotFoundView;
