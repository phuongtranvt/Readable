import React, { Component } from 'react';
import serialize from 'form-serialize';
import {connect} from'react-redux'
import {withRouter} from 'react-router'
import uuidv1 from 'uuid'
import {capitalize} from '../utils/helpers';
import {Link} from 'react-router-dom';
import {createPost, updatePost, fetchAllCategories} from '../actions'

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const {editingPost, updatePost, createPost} = this.props;

    const data = serialize(e.target, {hash: true});
    data.timestamp = Date.now();

    if (editingPost) { // edit
      data.id = editingPost.id;
      updatePost(data);

    } else { // add new
      data.id = uuidv1();
      createPost(data);
    }
  }

  componentDidMount() {
    const {categories, fetchAllCategories} = this.props;

    if (!categories || !categories.length) {
      fetchAllCategories();
    }
  }

  render() {
    console.log('create post render', this.props)
    const {categories, isEdit, editingPost} = this.props;
    return (
      <div>
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
            this.props.history.goBack();
          }}
          className="create-post-form">
          <select
            name="category"
            defaultValue={editingPost ? editingPost.category : "none"}
          >
            <option value="none" disabled>Select category...</option>
            {categories && categories.map(category => (
              <option key={category} value={category}>{capitalize(category)}</option>
            ))}
          </select>
          <input
            type='text' name='author' placeholder='Author' className="text-input"
            defaultValue={editingPost ? editingPost.author : ''}
            readOnly={editingPost}
          />
          <input
            type='text' name='title' placeholder='Title' className="text-input"
            defaultValue={editingPost ? editingPost.title : ''}/>

          <div className="create-post__body">
            <textarea
              type='text' name='body' placeholder='Body' className="textarea-input"
              defaultValue={editingPost ? editingPost.body : ''}/>
          </div>

          <button className = "button" type="submit">Submit</button>
          <Link to="/">
            <button className = "button">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({categories, posts}, ownProps) => ({
  categories: Object.keys(categories),
})

const mapDispatchToProps = (dispatch) => ({
  createPost: (value) => dispatch(createPost(value)),
  updatePost: (value) => dispatch(updatePost(value)),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm))
