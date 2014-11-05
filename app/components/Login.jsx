/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  'displayName': 'Login',

  getInitialState: function () {
    return {
      isValidLogin: false
    };
  },

  submitForm: function () {

  },

  render: function () {
    return (<div>
      <form onSubmit={this.submitForm()}>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-warning btn-lg">Login</button>
      </form>
      <hr />
      <p>Need an account? <a href="/signup">Signup</a></p>
      <p>Or just go <a href="/">Home</a></p>
    </div>);
  }

});
