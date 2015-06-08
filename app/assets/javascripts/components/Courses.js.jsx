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
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCoursesFromServer();
    this.interval = setInterval(this.loadCoursesFromServer, this.props.pollInterval);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
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
