import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../../actions'
import PostForm from './PostForm'

class PostEdit extends Component {
  componentDidMount() {
    if (!this.props.currentPost) {
      this.props.fetchPost(this.props.match.params.postId)
    }
  }

  render() {
    return (
      <div>
        {this.props.currentPost && (
          <PostForm editingPost={this.props.currentPost} />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({posts}, ownProps) => ({
  currentPost: posts[ownProps.match.params.postId]
})

const mapDispatchToProps = {fetchPost}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)
