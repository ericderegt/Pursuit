var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

var Chapter = React.createClass({
  completedCheck: function() {
    if (this.props.complete == 0) {
      this.props.updateCompletedChapters('post', this.props.chapterId)
    } else {
      this.props.updateCompletedChapters('delete', this.props.chapterId)
    };
  },
  render: function() {
    var completed;
    if (this.props.complete == 1) {
      completed = 'Mark Incomplete';
    } else {
      completed = 'Mark Complete';
    };

    return (
      <div className="ui message">
        <div className="content">
          <a className="header" href={this.props.link} target="_blank">{this.props.index + 1} - {this.props.title}</a>
          <div className="description">
            <p>{this.props.content}</p>
            <button className="ui mini blue button" onClick={this.completedCheck}>{completed}</button>
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
        <Chapter title={chapter.title} chapterId={chapter.id} content={chapter.content} complete={chapter.completed_chapters.length} updateCompletedChapters={this.props.updateCompletedChapters} index={index} link={chapter.link} date={chapter.updated_at} key={index} />
      );
    }, this);
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
    this.interval = setInterval(this.loadChaptersFromServer, this.props.pollInterval);
    this.loadPlaylist();
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  updateCompletedChapters: function(type, chapterid){
    data = {id: chapterid};

    if (type == 'post') {
      $.post("api/completed_chapters", JSON.stringify(data))
        .done(function(data) {
          this.loadChaptersFromServer();
        }.bind(this))
        .fail(function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this));
    } else {
      $.ajax({
        method: "DELETE",
        url: "api/completed_chapters/" + data.id,
      }).done(function(data){
        this.loadChaptersFromServer();
      }.bind(this));
    };
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
      $.post("/api/playlists", JSON.stringify(data))
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
  chapterProgress: function() {
    count = 0;
    total = 0;
    this.state.chapters.map(function(chapter,index){
      if (chapter.completed_chapters.length == 0) {
        total++;
      } else if (chapter.completed_chapters.length == 1) {
        count++;
        total++;
      }
    });

    if (count == total) {
      return ('Completed!')
    } else {
      return (count + '/' + total);
    };
  },
  render: function() {

    mainContent = (
      <div className="courseBox">
        <div className="ui blue segment">
          <h3>{this.state.course.title}</h3>
          <p>{'Description - ' + this.state.course.description}</p>
          <p>{'Your Progress - ' + this.chapterProgress()}</p>
        </div>
        <ChapterList chapters={this.state.chapters} updateCompletedChapters={this.updateCompletedChapters} />
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