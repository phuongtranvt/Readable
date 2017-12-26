import React from 'react';
import PropTypes from 'prop-types'
import DeleteIcon from 'react-icons/lib/md/delete';

const CommentEditDeleteButtons = ({
  id,
  onEdit,
  onDelete,
}) => (
  <div className="edit-delete-content">
    <button onClick={() => onEdit(id)} className="comment-edit-btn">
    </button>
    <button className="icon-btn" onClick={() => onDelete(id)}>
      <DeleteIcon size={25} />
    </button>
  </div>
)

CommentEditDeleteButtons.propTypes = {
  id: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default CommentEditDeleteButtons;
