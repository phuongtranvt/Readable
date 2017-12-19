import React, { Component } from 'react';
import serialize from 'form-serialize';
import {connect} from'react-redux'
import {withRouter} from 'react-router'
import uuidv1 from 'uuid'
import {capitalize} from '../utils/helpers';
import {Link} from 'react-router-dom';
import {createPost, updatePost, fetchAllCategories} from '../actions'

class PostForm extends Component {
  constructor(props) {
    super(props);

    const {editingPost} = props;
    this.state = {
      category: editingPost ? editingPost.category : 'none',
      author: editingPost ? editingPost.author : '',
      title: editingPost ? editingPost.title : '',
      body: editingPost ? editingPost.body : '',

      touched: {
        category: false,
        author: false,
        title: false,
        body: false,
      }
    }
  }

  getErrorList = () => ({
    category: this.state.category === 'none',
    author: this.state.author.length === 0,
    title: this.state.title.length === 0,
    body: this.state.body.length === 0,
  })

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = field => e => {
    this.setState(preState => ({
      touched: {...preState.touched, [field]: true}
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.canSubmit()) {
      return;
    }

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

  canSubmit = () => {
    const errors = this.getErrorList();
    const isSubmitDisable = Object.keys(errors).some(field => errors[field]);
    return !isSubmitDisable;
  }

  componentDidMount() {
    const {categories, fetchAllCategories} = this.props;

    if (!categories || !categories.length) {
      fetchAllCategories();
    }
  }

  render() {
    const errors = this.getErrorList();
    const isSubmitDisable = Object.keys(errors).some(field => errors[field]);

    const shouldMarkError = (field) => errors[field] && this.state.touched[field];

    const {categories, isEdit, editingPost} = this.props;
    return (
      <div>
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
            this.props.history.goBack();
          }}
          className="create-post-form">
          <select name="category"
                  value={this.state.category}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur('category')}
                  className={shouldMarkError('category') ? "error" : ""}
          >
            <option value="none" disabled>Select category...</option>
            {categories && categories.map(category => (
              <option key={category} value={category}>{capitalize(category)}</option>
            ))}
          </select>
          <input  type='text' name='author' placeholder='Author'
                  className={shouldMarkError('author') ? "error" : ""}
                  value={this.state.author}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur('author')}
                  readOnly={editingPost}
          />
          <input  type='text' name='title' placeholder='Title'
                  className={shouldMarkError('title') ? "error" : ""}
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur('title')}
          />

          <div className="create-post__body">
            <textarea type='text' name='body' placeholder='Body'
                      className={shouldMarkError('body') ? "error" : ""}
                      value={this.state.body}
                      onChange={this.handleInputChange}
                      onBlur={this.handleBlur('body')}
            />
          </div>

          <button className = "button" type="submit"
                  disabled={isSubmitDisable}
          >
            Submit
          </button>

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
