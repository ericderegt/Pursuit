var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

var CourseItem = React.createClass({
  render: function() {
    return (
      <a className="item" href={'/#courses/' + this.props.link}>{this.props.title}</a>
    );
  }
})

var MyCourses = React.createClass({
  render: function() {
    console.log(this.props.courses);
    var courseNodes = this.props.courses.map(function(course, index) {
      return (
        <CourseItem title={course.title} link={course.id} key={index} />
      );
    });
    return (
      <div>
        <h5>My Created Courses</h5>
        <div className="ui celled list">
            {courseNodes}
        </div>
      </div>
    );
  }
});

PursuitApp.Components.ShowSettings = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.user.set('username', this.state.username);
    this.props.user.set('email', this.state.email);
    this.props.user.save();
  },
  loadCoursesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({courses: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      username: this.props.user.attributes.username, 
      email: this.props.user.attributes.email,
      courses: []
    };
  },
  componentDidMount: function() {
    this.loadCoursesFromServer();
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
        <MyCourses courses={this.state.courses} />
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