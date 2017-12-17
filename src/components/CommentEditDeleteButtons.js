import React from 'react';
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

export default CommentEditDeleteButtons;
