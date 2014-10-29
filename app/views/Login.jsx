/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  'displayName': 'Login',

  getInitialState: function () {
    return {
      isValidLogin: false
    };
  },

  render: function () {
    return (<div>
      This is rendering out the {this.displayName} component.
    </div>);
  }

});
