var React = require("react");
var RoomCreateForm = require("./RoomCreateForm");
var UserStore = require("../../../stores/UserStore");
var IdeaStore = require("../../../stores/IdeaStore");
var RoomActions = require("../../../actions/RoomActions");
var Router = require("react-router");
var Link = Router.Link;
var Reflux = require("reflux");

function ideaWordCloud(selector, ideaWords){
  function wordCloud(selector) {

    var fill = d3.scale.category20();
    var selector = selector.split(" ")[0]
    if (selector = ".room" || ".idea" || ".comments" || ".rooms" || ".hero") {
      selector = undefined;
    }

    var svg = d3.select(selector).append("svg")
                .attr("width", 150)
                .attr("height", 100)
                .append("g")
                .attr("transform", "translate(50,50)");

    function draw(words) {
      //Use the 'text' attribute (the word itself) to identity unique elements.
      var cloud = svg.selectAll("g text")
                      .data(words, function(d) { return d.text; })

      //Entering words
      cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });

      //Entering and existing words
      cloud.transition()
            .duration(1900)
            .style("font-size", function(d) { return d.size + "px"; })
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1);

      //Exiting words
      cloud.exit()
            .transition()
            .duration(400)
            .style('fill-opacity', 1e-6)
            .attr('font-size', 1)
            .remove();
    }

    return {
        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        update: function(words) {
            d3.layout.cloud().size([135, 100])
                .words(words)
                .padding(2)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

  }

  //http://en.wikiquote.org/wiki/Opening_lines
  var words = ideaWords;
  if (words.length === 0){
    words.push("create ideas");
  }

  //Remove punctation and repeated words. Compute a random
  // size attribute for each word.
  function getWords(i) {

    return words[i]
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .map(function(d) {
              return {text: d, size: 14 + Math.random() * 5};
            })
  }

  //Tell the word cloud to redraw with a new set of words.
  //In reality the new words will probably come from a server request,
  // user input or some other source.
  function showNewWords(vis, i) {
    i = i || 0;

    vis.update(getWords(i ++ % words.length))
    setTimeout(function() { showNewWords(vis, i + 1)}, 4000)
  }

  var myWordCloud = wordCloud(selector);
  showNewWords(myWordCloud);

}


var Room = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    id : React.PropTypes.string,
    name : React.PropTypes.string,
    owner : React.PropTypes.string,
    ownerName : React.PropTypes.string
  },

  getInitialState: function() {
    // set initial editing state to false
    return {
      displaying: true,
      editing: false,
      filtered: false,
      currentUser: UserStore.get()
    };
  },


  componentDidMount: function() {
    // add a change listener on the IdeaStore
    // this is needed when the edit comes back and emits a change
    // that will force the component to re-render

    this.listenTo(IdeaStore, this._onChange);
    var self = this;
    window.setTimeout(function() {
      var ideas = IdeaStore.getAll();
      var ideaNames = [];
      for (var i = 0; i < ideas.length; i++){
        if (ideas[i].room === self.props._id){
          ideaNames.push(ideas[i].name);
        }
      }
      ideaWordCloud("."+self.props.name, ideaNames)
    }, 5000)

  },


  _onChange: function(){
    if(this.isMounted()) {
      this.setState({editing: false});
    }
  },


  show: function () {
    if (this.isMounted()) {
      this.setState({ displaying: !this.state.displaying });
    }
  },

  render: function() {
    var roomContent;
    var editForm;
    var currentUser = this.state.currentUser;
    var roomOwner = this.props.owner;

    if (this.state.editing) {
      editForm = <RoomCreateForm editing="true" owner={this.props.owner} name={this.props.name} key={this.props._id} _id={this.props._id} />
    }

    //if displaying form
    if (this.state.displaying && currentUser) {
      // if there is a current user and their id is the same as the roomOwner id, allow them to edit their own idea
      if (currentUser._id === roomOwner) {
        roomContent = (
          <div className="room pure-u-1">
            <span><Link to="ideaRoomView" params={{roomId: this.props._id}} className="room-anchor" style={{fontSize: "1.5rem", paddingLeft: "10px"}}>{this.props.name}</Link></span><span className={this.props.name}></span>

            <form className="pure-form pure-g">
                {editForm}
              </form>
            <div className="pure-u-1-1 auth-check">
              <button style={{marginLeft:"5px", marginRight:"5px"}} className="button-small pure-button pure-button-primary" onClick={this.edit}>{ this.state.editing ? 'Cancel' : 'Edit Room'}</button>
              <button style={{marginLeft:"5px", marginRight:"5px"}} className="button-small pure-button pure-button-primary" onClick={this.delete}>Delete Room</button>
            </div>

          </div>
        );
      }
      //othersise if they arent a current user of were'nt the originator of an idea, dont let them edit/delete it. just like or comment it
      else {
        roomContent = (
          <div className="room pure-u-1">
            <span><Link to="ideaRoomView" params={{roomId: this.props._id}} style={{fontSize: "1.5rem", paddingLeft: "10px"}} className="room-anchor">{this.props.name}</Link></span><span className={this.props.name}></span>
          </div>
        );
      }
    }

    return (
      <div>
          {roomContent}
      </div>
    );
  },

  edit: function(e) {
    e.preventDefault();
    if (this.isMounted()) {
      this.setState({ editing: !this.state.editing });
    }
  },

  delete: function(e) {
    e.preventDefault();
    if(this.props._id === '' || undefined){
      return;
    }
    if (this.isMounted()) {
      RoomActions.delete({ id: this.props._id, owner: this.props.owner });
    }
  }
});

module.exports = Room;

