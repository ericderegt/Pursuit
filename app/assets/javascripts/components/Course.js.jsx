var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

var Chapter = React.createClass({
  render: function() {
    return (
      <div className="ui message">
        <div className="content">
          <a className="header" href={this.props.link} target="_blank">{this.props.index + 1} - {this.props.title}</a>
          <div className="description">
            <p>{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
});

PursuitApp.Components.CourseBox = React.createClass({
  loadChaptersFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({chapters: data.chapters});
        this.setState({course: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {course: [], chapters: []};
  },
  componentDidMount: function() {
    this.loadChaptersFromServer();
  },
  render: function() {
    return (
      <div className="courseBox">
        <h3 className="ui blue segment">{this.state.course.title}</h3>
        <ChapterList chapters={this.state.chapters} />
      </div>
    );
  }
});

var ChapterList = React.createClass({
  render: function() {
    var chapterNodes = this.props.chapters.map(function(chapter, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Chapter title={chapter.title} content={chapter.content} index={index} link={chapter.link} date={chapter.updated_at} key={index} />
      );
    });
    return (
      <div className="chapterList">
        <div className="ui hidden divided items">
          {chapterNodes}
        </div>
      </div>
    );
  }
});
