var request = window.superagent;

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadCommentsFromServer: function() {
    var that = this;
    request.get(this.props.url).end(function(err, res) {
      if(err) console.error(err);
      console.dir(res);
      that.setState({data: res.body});
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comment</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">comment form</div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="api/comments" pollInterval={2000}/>,
  document.getElementById('content')
);
