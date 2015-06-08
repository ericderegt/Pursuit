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
    mainContent = (
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

    leftContent = (
      <div>
        <h5>My Playlist</h5>
        <div className="ui celled list">
          <div className="item">Cats</div>
          <div className="item">Horses</div>
          <div className="item">Dogs</div>
        </div>
      </div>
    );

    return (
      <div>
        <main className="ui page grid">
          <div className="row">
            <div className="ui hidden divider"></div>
            <div className="ui hidden divider"></div>     
            <div className="four wide column">
              <div className="row" id="left-content">
                {leftContent}
              </div>
            </div>

            <div className="twelve wide column">
              <div className="row" id="main-content">
                {mainContent}
              </div>
            </div>

          </div>
        </main>
      </div>
    );
  }
});