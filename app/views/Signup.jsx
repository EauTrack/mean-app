/** @jsx React.DOM */

var React = require('react');
var Layout = require('./MainLayout.jsx');
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
    debugger;
    if (this.refs.password !== this.refs.confirmPassword) {
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
      <Layout title="EauTracker - Signup">
        <div className="row">
          <div className="center-form panel">
            <form method="post" name="signupForm" onSubmit="{this.submitForm}">
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
        </div>
        <script src="/components.js"></script>

        <script dangerouslySetInnerHTML={{__html:
          "var Signup = require('Signup');" +
          "React.renderComponent(Signup(" + safeStringify(this.props) + ")," +
          "document.getElementById('main_container'))"}}
        >
        </script>

    </Layout>);
  }

});

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = Signup;
