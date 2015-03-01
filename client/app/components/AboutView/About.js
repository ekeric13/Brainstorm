var React = require("react");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var i1 = 0;
var i2 = 0;
var i3 = 0;
var i4 = 0;
var i5 = 0;
var i6 = 0;
var brainstormScreenShot1 = '<img className="image" src="styles/assets/brainstorm1.png"/>';
var brainstormScreenShot2 = '<img className="image" src="styles/assets/brainstorm2.png"/>';
var brainstormScreenShot3 = '<img className="image" src="styles/assets/brainstorm3.png"/>';
var brainstormScreenShot4 = '<img className="image" src="styles/assets/brainstorm4.png"/>';
var brainstormScreenShot5 = '<img className="image" src="styles/assets/brainstorm5.png"/>';
var brainstormScreenShot6 = '<img className="image" src="styles/assets/brainstorm6.png"/>';
var brainstormGif1 = '<video src="http://share.gifyoutube.com/v1q4WP.webm" autoplay="" loop="" id="video" className="tc-videoHost"></video>';
var brainstormGif2 = '<video src="http://share.gifyoutube.com/yg0ODA.webm" autoplay="" loop="" id="video" className="tc-videoHost"></video>';
var brainstormGif3 = '<video src="http://share.gifyoutube.com/vnpGD9.webm" autoplay="" loop="" id="video" className="tc-videoHost"></video>';
var brainstormGif4 = '<video src="http://share.gifyoutube.com/vq58z2.webm" autoplay="" loop="" id="video" className="tc-videoHost" ></video>';
var brainstormGif5 = '<video src="http://share.gifyoutube.com/y4YRxV.webm" autoplay="" loop="" id="video" className="tc-videoHost"></video>';
var brainstormGif6 = '<video src="http://share.gifyoutube.com/KeD1k9.webm" autoplay="" loop="" id="video" className="tc-videoHost"></video>';

var About = React.createClass({

  mixins: PureRenderMixin,

  swap1: function(e){
    console.log("swapped", e.target);
    $(e.target).parent().html(++i1 % 2 ? brainstormGif1 : brainstormScreenShot1);
  },

  swap2: function(e){
    $(e.target).parent().html(++i2 % 2 ? brainstormGif2 : brainstormScreenShot2);
  },

  swap3: function(e){
    $(e.target).parent().html(++i3 % 2 ? brainstormGif3 : brainstormScreenShot3);
  },

  swap4: function(e){
    $(e.target).parent().html(++i4 % 2 ? brainstormGif4 : brainstormScreenShot4);
  },

  swap5: function(e){
    $(e.target).parent().html(++i5 % 2 ? brainstormGif5 : brainstormScreenShot5);
  },

  swap6: function(e){
    $(e.target).parent().html(++i6 % 2 ? brainstormGif6 : brainstormScreenShot6);
  },

  render: function(){
    return (
      <div>
        <h1>How to get started</h1>
        <h5><b>-Click image for example animation </b></h5>
        <h6>-Click again to stop animation </h6>
        <h3> Brainstorming </h3>
        <ul>
          <li className="header-text">1. Join/create a room with your colleagues and solo brainstorm for 5 minutes. </li>
          <li><div onClick={this.swap1} className="target"><img className="image" src="styles/assets/brainstorm1.png"/></div></li>
        </ul>
        <ul>
          <li className="header-text">2. Brainstorm for another few minutes drawing inspiration from others ideas </li>
          <li><div onClick={this.swap2} className="target"><img className="image" src="styles/assets/brainstorm2.png"/></div></li>
        </ul>
        <ul>
          <li className="header-text">3. Post a hangout in the comments of an idea you want to brainswarm </li>
          <li><div onClick={this.swap3} className="target"><img className="image" src="styles/assets/brainstorm3.png"/></div></li>
        </ul>
        <h3> Brainswarming </h3>
        <ul>
          <li className="header-text">4. Brainswarm: build resources that can help you achieve your idea </li>
          <li><div onClick={this.swap4} className="target"><img className="image" src="styles/assets/brainstorm4.png"/></div></li>
        </ul>
        <ul>
          <li className="header-text">5. Create actions that need to be implemented with resources to achieve your idea  </li>
          <li><div onClick={this.swap5} className="target"><img className="image" src="styles/assets/brainstorm5.png"/></div></li>
        </ul>
        <ul>
          <li className="header-text">6. Create a desired path for achieving your idea  </li>
          <li><div onClick={this.swap6} className="target"><img className="image" src="styles/assets/brainstorm6.png"/></div></li>
        </ul>
      </div>

    );
  }

});

module.exports = About;
