import React from 'react'
import PropTypes from 'prop-types'
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

CommentEdit.propTypes = {
  editingComment: PropTypes.object.isRequired,
  onSubmitCB: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default CommentEdit
