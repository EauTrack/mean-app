/** @jsx React.DOM */

var React = require('react');

var Profile = React.createClass({
  displayName: 'Profile',


  render: function () {
    return (
      <div>
        <h1>EauTracker</h1>
        <p>A way of tracking your water consumption from any device.</p>
        <ul>
          <li><a href="/signup" className="btn">Signup</a></li>
          <li><a href="/login" className="btn">Login</a></li>
        </ul>
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
