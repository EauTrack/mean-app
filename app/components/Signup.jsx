'use strict';

var React = require('react');
var axios = require('axios');

var Signup = React.createClass({
  'displayName': 'Signup',

  getInitialState: function () {
    return {
      formOkay: true
    };
  },

  submitForm: function (event) {
    event.preventDefault();
    if (this.refs.password.getDOMNode().value !== this.refs.confirmPassword.getDOMNode().value) {
      this.setState({formOkay: false});
      return;
    } else {
      axios.post('/api/signup', {
        email: this.refs.email.getDOMNode().value,
        password: this.refs.password.getDOMNode().value
      }).then(function (response) {
        console.log(response);
      });
    }

  },


  render: function () {
    return (
      <div className="row">
        <div className="center-form panel">
          <form method="post" name="signupForm" onSubmit={this.submitForm}>
            <div className="panel-body">
              <h2 className="text-center">Signup for EauTracker</h2>
              <div className="form-group">
                <input ref="email" className="form-control input-lg" type="email" id="email" name="email" placeholder="Email" required autofocus />
              </div>
              <div className="form-group">
                <input ref="password" className="form-control input-lg" type="password" name="password" placeholder="Password" required />
              </div>
              <div className="form-group">
                <input ref="confirmPassword" className="form-control input-lg" type="password" name="confirmPassword"  placeholder="Confirm Password" required />
              </div>
              <button type="submit" className="btn btn-lg btn-block btn-primary">Create Account</button>
            </div>
          </form>
        </div>
        <script src="/bundles/signup.js"></script>
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
  var factory = React.createFactory(Signup);
  React.render(factory(props), container);
}


module.exports = Signup;
