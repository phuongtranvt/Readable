const api = "http://localhost:3001";

let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Authorization': token,
  'Accept': 'application/json',
}

const customFetch = (url, options) => {
  if (options == null) options = {}
  if (options.credentials == null) options.credentials = 'same-origin'
  return fetch(url, options).then(function(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      var error = new Error(response.statusText || response.status)
      error.response = response
      return Promise.reject(error)
    }
  })
}


export const getAllCategories = () => (
  customFetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)
);

export const getAllPosts = () => (
  customFetch(`${api}/posts`, {headers})
    .then(res => res.json())
);

export const getPosts = (category) => (
  customFetch(`${api}/${category}/posts`, {headers})
    .then(res => res.json())
);

export const getPost = (postId) => (
  customFetch(`${api}/posts/${postId}`, {headers})
    .then(res => res.json())
)

export const deletePost = (postId) => console.log('token', token) || (
  customFetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers
  })
)

export const updatePost = (post) => (
  customFetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: post.title,
      body: post.body,
      category: post.category})
  })
    .then(res => res.json())
)

export const createPost = (body) => (
  customFetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
)

const votePost = (postId, opt) => (
  customFetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:opt})
  })
)

export const postUpVote = (postId) => votePost(postId, 'upVote');

export const postDownVote = (postId) => votePost(postId, 'downVote');

export const getComments = (postId) => (
  customFetch(`${api}/posts/${postId}/comments`, {headers})
    .then(res => res.json())
)

const voteComment = (commentId, opt) => (
  customFetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:opt})
  })
)

export const commentUpVote = (commentId) => voteComment(commentId, 'upVote');

export const commentDownVote = (commentId) => voteComment(commentId, 'downVote');

export const updateComment = comment => (
  customFetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timestamp: comment.timestamp,
      body: comment.body,
    })
  })
    .then(res => res.json())
)

export const createComment = comment => (
  customFetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment)
  })
  .then(res => res.json())
)

export const deleteComment = (id) => (
  customFetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers,
  })
)

/*
const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));
*/
