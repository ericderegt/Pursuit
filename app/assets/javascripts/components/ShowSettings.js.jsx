var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Components.ShowSettings = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.user.set('username', this.state.username);
    this.props.user.set('email', this.state.email);
    this.props.user.save();
  },
  getInitialState: function() {
    return {username: this.props.user.attributes.username, email: this.props.user.attributes.email};
  },
  componentDidMount: function() {
    console.log(this.props.user)
  },
  componentWillUnmount: function() {

  },
  handleChange: function(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  render: function() {
    return (
      <div className="userInfo">
        <h3>Settings</h3>
        <form className="ui small form segment" onSubmit={this.handleSubmit}>
          <div className="two fields">
            <div className="field">
              <label>Username</label>
              <input value={this.state.username} type="text" onChange={this.handleChange('username')} />
            </div>
            <div className="field">
              <label>Email</label>
              <input value={this.state.email} type="text" onChange={this.handleChange('email')} />
            </div>
          </div>
          <button className="ui submit button">Submit</button>
        </form>
      </div>
    );
  }
});