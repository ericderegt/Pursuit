var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

var Course = React.createClass({
  render: function() {
    return (
      <div className="ui item">
        <div className="ui tiny rounded image">
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
      <a className="item" href={'/#courses/' + this.props.course}>{this.props.name}</a>
    );
  }
})

var Playlists = React.createClass({
  render: function() {
    var playlistNodes = this.props.playlist.map(function(playlistItem, index) {
      return (
        <PlaylistItem name={playlistItem.get('course').title} course={playlistItem.get('course_id')} key={index} />
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
  // This function was pulling in the playlists. After switching to a backbone collection, don't need this anymore
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
  getInitialState: function() {
    return {data: [], playlists: []};
  },
  componentDidMount: function() {
    this.loadCoursesFromServer();
    this.interval = setInterval(this.loadCoursesFromServer, this.props.pollInterval);
    this.props.playlist.on('add remove change', this.forceUpdate.bind(this, null));
    this.props.playlist.fetch();
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    leftContent = (
      <div>
        <h5>My Playlists</h5>
        <Playlists playlist={this.props.playlist} />
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
