import React, { Component } from 'react';
import serialize from 'form-serialize';
import {connect} from'react-redux';
import PropTypes from 'prop-types'
import uuidv1 from 'uuid';
import {updateCommentAction, createCommentAction} from '../../actions'

class CommentForm extends Component {
  constructor(props) {
    super(props);

    const {editingComment} = props;
    this.state = {
      author: editingComment ? editingComment.author : '',
      body: editingComment ? editingComment.body : '',

      touched: {
        author: false,
        body: false,
      }
    }
  }

  getErrorList = () => ({
    author: this.state.author.length === 0,
    body: this.state.body.length === 0,
  })

  handleSubmitComment = (e) => {
    e.preventDefault();

    if (!this.canSubmit()) {
      return;
    }

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

  canSubmit = () => {
    const errors = this.getErrorList();
    const isSubmitDisable = Object.keys(errors).some(x => errors[x]);
    return !isSubmitDisable;
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = field => e => {
    this.setState(preState => ({
      touched: {...preState.touched, [field]: true}
    }))
  }

  resetForm = () => {
    this.setState({
      author: '',
      body: '',
      touched: {
        author: false,
        body: false,
      }
    })
  }

  render() {
    const errors = this.getErrorList();
    const isSubmitDisable = Object.keys(errors).some(x => errors[x]);
    const isResetDisable = this.state.author.length === 0
                            && this.state.body.length === 0


    const shouldMarkError = field => errors[field] && this.state.touched[field];

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
            <input  type="text"
                    name="author" placeholder="Author"
                    className={shouldMarkError('author') ? "error" : ""}
                    value={this.state.author}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur('author')}
            />
          )}

          <div className="comment__edit-body">
            <textarea type="text" name="body" placeholder="Write a comment..."
                      className={shouldMarkError('body') ? "error" : ""}
                      value={this.state.body}
                      onChange={this.handleInputChange}
                      onBlur={this.handleBlur('body')}
            />
          </div>

          <button className="button" type="submit"
                  disabled={isSubmitDisable}
          >
            Submit
          </button>

          {editingComment
            ? (
                <button className="button" type="button"
                        onClick={onCancel}
                >
                  Cancel
                </button>
              )
            : (
              <button className="button" type="button"
                      onClick={this.resetForm}
                      disabled={isResetDisable}
              >
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

CommentForm.propTypes = {
  editingComment: PropTypes.object,
  onSubmitCB: PropTypes.func,
  onCancel: PropTypes.func,
  parentId: PropTypes.string,
};

export default connect(null, mapDispatchToProps)(CommentForm);
