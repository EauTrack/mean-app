/** @jsx React.DOM */

var React = require('react');

var MainLayout = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.css" />
          <link rel="stylesheet" href="/styles/compiled.css" />
        </head>
        <body>
          <div id="main_container" className="container">
            {this.props.children}
          </div>
        </body>
      </html>
    );
  }
});

module.exports = MainLayout;
