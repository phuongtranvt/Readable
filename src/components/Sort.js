import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toogleSortOrder, setSortBy} from '../actions';

class Sort extends Component {
  sortList = [
    {
      id: 'none',
      name: 'Sort by...'
    },
    {
      id : 'voteScore',
      name: 'Vote Score',
    },
    {
      id: 'timestamp',
      name: 'Date'
    }];

  render() {
    console.log('in Sort render', this.props);
    return (
      <div className="sort">
        <button onClick={this.props.toogleSortOrder}>
          {this.props.isSortDescending ? "Descending": "Ascending"}
        </button>
        <select
          onChange={(event) => this.props.setSortBy(event.target.value)}>
          {this.sortList.map(({id, name}) => (
            <option
              key={id}
              value={id}
              disabled={id === 'none'? true : false}
            >
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({sort}) => ({
  sortBy: sort.sortBy,
  isSortDescending: sort.isSortDescending,
})

const mapDispatchToProps = (dispatch) => ({
  toogleSortOrder: () => dispatch(toogleSortOrder()),
  setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
