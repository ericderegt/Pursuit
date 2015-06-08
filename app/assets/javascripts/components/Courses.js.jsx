var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

var Course = React.createClass({
  render: function() {
    return (
      <div className="ui item">
        <div className="ui small image">
          <img src={this.props.imageUrl} />
        </div>
        <div className="content">
          <a className="header" href={'/#courses/' + this.props.courseID}>{this.props.title}</a>
          <div className="meta">
            <span>{moment(this.props.date).startOf('hour').fromNow()}</span>
          </div>
          <div className="description">
            <p>{this.props.description}</p>
          </div>
        </div>
      </div>
    );
  }
});

var CourseList = React.createClass({
  render: function() {
    var courseNodes = this.props.data.map(function(course, index) {
      return (
        <Course title={course.title} description={course.description} courseID={course.id} date={course.updated_at} imageUrl={course.image_url} key={index} />
      );
    });
    return (
      <div className="courseList">
        <div className="ui divided items">
          {courseNodes}
        </div>
      </div>
    );
  }
});

var PlaylistItem = React.createClass({
  render: function() {
    return (
      <div className="item">{this.props.user + ' - ' + this.props.course}</div>
    );
  }
})

var Playlists = React.createClass({
  render: function() {
    var playlistNodes = this.props.playlists.map(function(playlist, index) {
      return (
        <PlaylistItem user={playlist.user_id} course={playlist.course_id} key={index} />
      );
    });
    return (
      <div className="playlists">
        <div className="ui celled list">
          {playlistNodes}
        </div>
      </div>  
    );
  }
})

PursuitApp.Components.CoursesBox = React.createClass({
  loadCoursesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadPlaylists: function() {
    $.ajax({
      url: '/api/playlists',
      dataType: 'json',
      success: function(data) {
        this.setState({playlists: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCourseSubmit: function(course) {
    var courses = this.state.data;
    courses.push(course);
    this.setState({data: courses}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: course,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: [], playlists: []};
  },
  componentDidMount: function() {
    this.loadCoursesFromServer();
    this.loadPlaylists();
    this.interval = setInterval(this.loadCoursesFromServer, this.props.pollInterval);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    leftContent = (
      <div>
        <h5>My Playlists</h5>
        <Playlists playlists={this.state.playlists} />
      </div>
    );

    mainContent = (
      <div className="coursesBox">
        <h3>Courses</h3>
        <CourseList data={this.state.data} />
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
