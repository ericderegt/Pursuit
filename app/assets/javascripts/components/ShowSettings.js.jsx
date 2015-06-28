var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

var CourseItem = React.createClass({
  deleteSelected: function() {
    this.props.deleteCourse(this.props.link);
  },
  render: function() {
    return (
      <div className="ui small card">
        <div className="image">
          <img src={this.props.image_url} />
        </div>
        <div className="content">
          {this.props.title}
          <div className="ui divider"></div>
          <div className="ui bottom attached button" onClick={this.deleteSelected}>
            Delete
          </div>
        </div>
      </div>
    );
  }
});

var MyCourses = React.createClass({
  render: function() {
    var courseNodes = this.props.courses.map(function(course, index) {
      return (
        <CourseItem title={course.title} link={course.id} image_url={course.image_url} key={index} deleteCourse={this.props.deleteCourse} />
      );
    }, this);
    return (
      <div>
        <h5>My Created Courses</h5>
        <div className="ui cards">
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
  deleteCourse: function(course) {
    $.ajax({
      method: "DELETE",
      url: "api/courses/" + course,
    }).done(function(data){
      console.log('done');
      this.loadCoursesFromServer();
    }.bind(this));
  },
  render: function() {
    mainContent = (
      <div>
        <MyCourses courses={this.state.courses} deleteCourse={this.deleteCourse} />
      </div>
    );

    leftContent = (
      <div className="userInfo">
        <h5>Edit User Settings</h5>
        <form className="ui small form segment" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input value={this.state.username} type="text" onChange={this.handleChange('username')} />
          </div>
          <div className="field">
            <label>Email</label>
            <input value={this.state.email} type="text" onChange={this.handleChange('email')} />
          </div>
          <button className="ui submit button">Submit</button>
        </form>
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
