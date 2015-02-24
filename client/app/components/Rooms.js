var React = require("react");
var Room = require("./Room");
var RoomStore = require("../stores/RoomStore");
var IdeaStore = require("../stores/IdeaStore");

function ideaWordCloud(selector, ideaWords){
  function wordCloud(selector) {

    var fill = d3.scale.category20();

    // var selector = selector.split(" ")[0]

    var header = d3.select(selector)
                  .append("text")
                    .attr("x", 50)
                    .attr("y", 10)
                    .attr("dy", ".71em")
                    .style("font-size", "20px")
                    .style("text-anchor", "end")
                    .style("position", "absolute")
                    .style("margin-top", "-10px")
                    .attr("fill", "black")
                    .text("Ideas currently Brianstormed");

    var svg = d3.select(selector).append("svg")
                .attr("width", 300)
                .attr("height", 200)
                .append("g")
                .attr("transform", "translate(100,100)");


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
            d3.layout.cloud().size([300, 200])
                .words(words)
                .padding(4)
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
  console.log("here are the words", words);


  //Remove punctation and repeated words. Compute a random
  // size attribute for each word.
  function getWords(i) {
    function unique(value, index, self) {
        return self.indexOf(value) === index;
    }

    return words[i]
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .filter(unique)
            .map(function(d) {
              return {text: d, size: 15 + Math.random() * 30};
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


var Rooms = React.createClass({
  getInitialState: function() {
    return {
      rooms: RoomStore.getAll()
    };
  },

  componentDidMount: function() {
    RoomStore.all();
    IdeaStore.all();
    RoomStore.addChangeListener(this._onChange);
    var that = this;
    window.setTimeout(function() {
      var ideas = IdeaStore.getAll();
      var ideaNames = [];
      for (var i = 0; i< ideas.length; i++){
        ideaNames.push(ideas[i].name)
      }
      console.log("ideaNames", ideaNames);
      ideaWordCloud(".wordCloud", ideaNames)
    }, 5000)
  },

  _onChange: function(){
    if(this.isMounted()) {
      this.setState({ rooms: RoomStore.getAll() });
    }
  },

  // componentWillUnmount: function(){
  //   RoomStore.removeChangeListener(this._onChange);
  // },

  render: function() {
    var rooms = [];

    this.state.rooms.forEach(function(room) {
      rooms.push(<Room name={room.name} ownerName={room.ownerName} owner={room.owner} key={room._id} _id={room._id} />);
    });
    return (
      <div>
        <div className="wordCloud">
        </div>
        <div className="rooms">
          { rooms }
        </div>
      </div>
    );
  }
});

module.exports = Rooms;
