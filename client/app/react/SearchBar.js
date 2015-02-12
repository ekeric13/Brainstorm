app.SearchBar = React.createClass({displayName: "SearchBar",
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value,
            this.refs.filterNamesInput.getDOMNode().value
        );
    },
    render: function() {
        return (

            React.createElement("form", {onSubmit: this.handleSubmit}, 
                React.createElement("span", null, " Filter by idea: "), 
                React.createElement("input", {
                    type: "text", 
                    placeholder: "Search for idea text...", 
                    value: this.props.filterText, 
                    ref: "filterTextInput", 
                    onChange: this.handleChange}
                ), 
                React.createElement("span", null, " Filter by username: "), 
                React.createElement("input", {
                    type: "text", 
                    placeholder: "Search for user...", 
                    value: this.props.filterNames, 
                    ref: "filterNamesInput", 
                    onChange: this.handleChange}
                )
            )
        );
    }
});
