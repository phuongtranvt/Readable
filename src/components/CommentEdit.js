import React from 'react'
import CommentForm from './CommentForm'

const CommentEdit = ({
  editingComment,
  onSubmitCB,
  onCancel,
}) => (
  <CommentForm  editingComment={editingComment}
                onSubmitCB={onSubmitCB}
                onCancel={onCancel}
  />
)

export default CommentEdit
