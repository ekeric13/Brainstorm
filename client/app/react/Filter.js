app.Filter = React.createClass({displayName: "Filter",
  getInitialState: function() {
    // set initial editing state to false
    return {
      showing : true
    };
  },

  componentDidMount: function() {
    // add a change listener on the IdeaStore
    // this is needed when the edit comes back and emits a change
    // that will force the component to re-render
    // app.IdeaStore.addChangeListener(function() {
    //   if(this.isMounted()) {
    //     this.setState({editing: false});
    //   }
    // }.bind(this));
  },

  handleClick: function(){

    if (this.state.showing){

      setState({showing: false});

      app.FilterActions.filterName({id:this.props.owner, name:this.props.ownerName})

    }

  },


  show: function () {
    if (this.isMounted()) {
      this.setState({ displaying: !this.state.displaying });
    }
  },


  render: function() {
    // var ideaContent;
    // var editForm;
      console.log('FILTER',this);


    return (
      React.createElement("form", {class: "pure-form"}, 
            this.props.ownerName, " ", React.createElement("input", {id: "filterBox", type: "checkbox", defaultChecked: true, onClick: this.handleClick})
      )
    );
  }

});
  // edit: function(e) {
  //   e.preventDefault();
  //   if (this.isMounted()) {
  //     this.setState({ editing: !this.state.editing });
  //   }
  // },

  // delete: function(e) {
  //   e.preventDefault();
  //   if (this.isMounted()) {
  //     app.IdeaActions.delete({ id: this.props._id });
  //   }
  // }
