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

var ChapterList = React.createClass({
  render: function() {
    var chapterNodes = this.props.chapters.map(function(chapter, index) {
      return (
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

var CourseInfo = React.createClass({
  statusChange: function(){
    this.props.updateFavStatus(!this.props.playBool);
  },
  render: function() {
    var categoryTag;
    if (this.props.tags.length > 0) {
      categoryTag = 'Category - ' + this.props.tags;
    }
    var playlistButton;
    if (this.props.playBool == true) {
      playlistButton = 'Remove from playlist'
    } else {
      playlistButton = 'Add to Playlist'
    };
    return (   
      <div className="ui fluid card">
        <div className="image">
          <img src={this.props.course.image_url} />
        </div>
        <div className="content">
          <a className="header">{'Author - ' + this.props.user.username}</a>
          <div className="meta">
            <span className="date">{'Created on ' + moment(this.props.course.updated_at).format('MMMM Do YYYY')}</span>
          </div>
          <div className="description">
            {categoryTag}
          </div>
          <div className="ui divider"></div>
          <div className="ui bottom attached button" onClick={this.statusChange}>
            {playlistButton}
          </div>
        </div>
      </div>
    );
  }
})

PursuitApp.Components.CourseBox = React.createClass({
  loadChaptersFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({chapters: data.chapters});
        this.setState({course: data});
        this.setState({user: data.user});
        
        if (data.tags.length) {
          this.setState({tags: data.tags[0].category.name});
        };
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadPlaylist: function() {
    $.ajax({
      url: this.props.playUrl,
      dataType: 'json',
      success: function(data) {
        this.setState({playBool: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.playUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {course: [], chapters: [], user: [], tags: [], playBool: false};
  },
  componentDidMount: function() {
    this.loadChaptersFromServer();
    this.loadPlaylist();
  },
  updateFavStatus: function(status){
    this.setState({playBool: status});
    data = {id: this.props.course_id};
    // data.id = this.props.course_id;

    if (status === true) {
      // $.ajax({
      //   url: '/api/playlists',
      //   dataType: 'json',
      //   cache: false,
      //   type: 'POST',
      //   data: data,
      //   success: function(data) {
      //     console.log(data);
      //   }.bind(this),
      //   error: function(xhr, status, err) {
      //     console.error(this.props.url, status, err.toString());
      //   }.bind(this)
      // });
      $.post("/api/playlists", data)
        .done(function (data) {
          console.log(data);
        })
        .fail(function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        });
    } else {
      $.ajax({
        method: "DELETE",
        url: "api/playlists/" + data.id,
      }).done(function(data){
        console.log('done');
      })
    };
  },
  render: function() {
    mainContent = (
      <div className="courseBox">
        <div className="ui blue segment">
          <h3>{this.state.course.title}</h3>
          <p>{'Description - ' + this.state.course.description}</p>
        </div>
        <ChapterList chapters={this.state.chapters} />
      </div>
    );

    leftContent = (
      <div>
        <CourseInfo updateFavStatus={this.updateFavStatus} playBool={this.state.playBool} course={this.state.course} tags={this.state.tags} user={this.state.user} />
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