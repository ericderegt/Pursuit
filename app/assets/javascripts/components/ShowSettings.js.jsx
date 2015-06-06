var PursuitApp = PursuitApp || { Models: {}, Collections: {}, Components: {}, Routers: {} };

PursuitApp.Components.ShowSettings = React.createClass({
  handleSubmit: function(course) {
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
    return {userInfo: this.props.info};
  },
  componentDidMount: function() {
    console.log(this.props.info)
  },
  componentWillUnmount: function() {

  },
  render: function() {
    return (
      <div className="coursesBox">
        <h3>Settings</h3>
        <p>{this.props.info.username}</p>
        <p>{this.props.info.email}</p>
      </div>
    );
  }
});