import React from 'react';

import ArrowUpIcon from 'react-icons/lib/ti/arrow-sorted-up';
import ArrowDownIcon from 'react-icons/lib/ti/arrow-sorted-down';

const Vote = ({id, voteScore, onUpVote, onDownVote, size}) => (
    <div className="post-vote-content">
        <button
          className="icon-btn-vote"
          onClick={() => onUpVote(id)}
        >
          <ArrowUpIcon size={size} />
        </button>
        <p className="post-voteScore">{voteScore}</p>
        <button
          className="icon-btn-vote"
          onClick={() => onDownVote(id)}
        >
          <ArrowDownIcon size={size} />
        </button>
    </div>
)

export default Vote;
