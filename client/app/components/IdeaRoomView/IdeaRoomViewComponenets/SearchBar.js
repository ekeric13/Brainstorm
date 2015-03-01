var React = require("react");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var SearchBar = React.createClass({

  mixins: PureRenderMixin,

    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value,
            this.refs.filterNamesInput.getDOMNode().value
        );
    },
    render: function() {
        return (

            <form onSubmit={this.handleSubmit}>
                <span> Filter by idea: </span>
                <input
                    type="text"
                    placeholder="Search for idea text..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
                <span> Filter by username: </span>
                <input
                    type="text"
                    placeholder="Search for user..."
                    value={this.props.filterNames}
                    ref="filterNamesInput"
                    onChange={this.handleChange}
                />
            </form>
        );
    }
});

module.exports = SearchBar;
