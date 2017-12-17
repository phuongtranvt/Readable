import React, { Component } from 'react';
import serialize from 'form-serialize';
import {connect} from'react-redux';
import uuidv1 from 'uuid';
import {updateCommentAction, createCommentAction} from '../actions'

class CommentForm extends Component {
  constructor(props) {
    super(props);

    const {editingComment} = props;
    this.state = {
      author: editingComment ? editingComment.author : '',
      body: editingComment ? editingComment.body : '',
    }
  }

  handleSubmitComment = (e) => {
    e.preventDefault();

    const {editingComment, parentId, updateComment, createComment} = this.props;

    const data = serialize(e.target, {hash: true});
    data.timestamp = Date.now();

    if (editingComment) { // edit
        data.id = editingComment.id;
        updateComment(data);

    } else { // create new
      data.id = uuidv1();
      data.parentId = parentId;
      createComment(data);
    }
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  resetForm = () => {
    this.setState({author: '', body: ''})
  }

  render() {
    const {editingComment, onSubmitCB, onCancel} = this.props;

    return (
      <div>
        <form onSubmit={e => {
                this.handleSubmitComment(e);
                if (!editingComment) {
                  this.resetForm();
                }
                else if (onSubmitCB) {
                  onSubmitCB();
                }
          }}>

          {!editingComment && (
            <input  type="text" className="text-input"
                    name="author" placeholder="Author"
                    value={this.state.author}
                    onChange={this.handleInputChange}/>
          )}

          <div className="comment__edit-body">
            <textarea type="text" name="body" placeholder="Write a comment..."
                      className="textarea-input"
                      value={this.state.body}
                      onChange={this.handleInputChange} />
          </div>

          <button className="button" type="submit">
            Submit
          </button>

          {editingComment
            ? (
                <button className="button" type="button"
                        onClick={onCancel}  >
                  Cancel
                </button>
              )
            : (
              <button className="button" type="button"
                      onClick={this.resetForm}  >
                Reset
              </button>
            )
          }
        </form>
      </div>
    )
  }


}

const mapDispatchToProps = (dispatch) => ({
  updateComment: (comment) => dispatch(updateCommentAction(comment)),
  createComment: (comment) => dispatch(createCommentAction(comment))
})


export default connect(null, mapDispatchToProps)(CommentForm);
