/** @jsx React.DOM */

var React = require('react');

var Profile = React.createClass({
  displayName: 'Profile',

  propTypes: {
    user: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div>
      {this.props.user}
      </div>
    );
  }


});

if (typeof window !== 'undefined') {
  var container = document.getElementById("container");
  var props = {};
  if (document.getElementById("props")) {
    props = JSON.parse(document.getElementById("props").innerHTML);
  }
  var factory = React.createFactory(Profile);
  React.render(factory(props), container);
}

module.exports = Profile;
