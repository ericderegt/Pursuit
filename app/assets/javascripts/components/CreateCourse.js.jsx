var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

var Chapters = React.createClass({
  render: function() {
    var createChapter = function(chapter, index) {
      return (
        <li key={index + chapter}>Chapter {index + 1}
          <ul>
            <li key={index + chapter.title +'title'}><b>Title</b> - {chapter.title}</li>
            <li key={index + chapter.link + 'link'}><b>Link</b> - {chapter.link}</li>
            <li key={index + chapter.content +'content'}><b>Content</b> - {chapter.content}</li>
          </ul>
        </li>
      );
    };
    return <ul>{this.props.chapters.map(createChapter)}</ul>;
  }
});

PursuitApp.Components.CreateCourse = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    
    var courseHash = {};
    courseHash.title = React.findDOMNode(this.refs.cTitle).value;
    courseHash.description = React.findDOMNode(this.refs.cDescription).value;
    courseHash.image_url = React.findDOMNode(this.refs.cImage).value;

    var newCourse = this.state.course.concat([courseHash]);
    this.refs.cTitle.getDOMNode().value = '';
    this.refs.cDescription.getDOMNode().value = '';
    this.refs.cImage.getDOMNode().value = '';

    this.setState({course: newCourse}, function(){
      var dataPost = {};
      dataPost.chapters = this.state.chapters;
      dataPost.course = this.state.course;

      console.log(dataPost)

      $.ajax({
        url: '/api/courses',
        dataType: 'json',
        cache: false,
        type: 'POST',
        data: dataPost,
        success: function(data) {
          PursuitApp.myRouter.navigate("", {trigger: true});
        }.bind(this),
        error: function(xhr, status, err) {
          // console.error(this.props.url, status, err.toString());
          PursuitApp.myRouter.navigate("", {trigger: true});
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {chapters: [], course: []};
  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  },
  handleChapter: function(e) {
    e.preventDefault();
    var chapterHash = {};
    chapterHash.title = React.findDOMNode(this.refs.title).value;
    chapterHash.link = React.findDOMNode(this.refs.link).value;
    chapterHash.content = React.findDOMNode(this.refs.content).value;

    var newChapters = this.state.chapters.concat([chapterHash]);
    this.refs.title.getDOMNode().value = '';
    this.refs.link.getDOMNode().value = '';
    this.refs.content.getDOMNode().value = '';
    this.setState({chapters: newChapters});
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
      <div className="createCourse">
        <h3>Create Course</h3>
        <form className="courseForm" onSubmit={this.handleSubmit}>
          <div className="ui small form segment">
            <h5>Enter course information here and then add as many chapters as you would like!</h5>
            <div className="field">
              <input type="text" ref="cTitle" placeholder="Title" />
            </div>
            <div className="field">
              <input type="text" ref="cDescription" placeholder="Description" />
            </div>
            <div className="field">
              <input type="text" ref="cImage" placeholder="Image URL" />
            </div>
          </div>

          <div className="ui small blue form segment">
            <h3>Add a Chapter</h3>
            <div className="field">
              <input type="text" ref="title" placeholder="Title" />
            </div>
            <div className="field">
              <input type="text" ref="link" placeholder="Link" />
            </div>
            <div className="field">
              <textarea ref="content" placeholder="Content" />
            </div>

            <button onClick={this.handleChapter}>{'Add Chapter ' + (this.state.chapters.length + 1)}</button>
          </div>

          <div className="ui hidden divider"></div>

          <h3>Created Chapters</h3>
          <Chapters chapters={this.state.chapters} />

          <button className="ui blue submit button">Submit</button>
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