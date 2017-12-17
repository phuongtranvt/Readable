import React from 'react'
import CommentForm from './CommentForm'

const CommentNew = ({parentId}) => (
    <div>
      <p style={{margin: "20px 0 0 0"}}>
        <strong>Create a comment</strong>
      </p>
      <CommentForm parentId={parentId}/>
    </div>
)

export default CommentNew
