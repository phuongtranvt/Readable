import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setErrorAction} from '../actions'

class ErrorBoundary extends Component {
  componentDidCatch(error, info) {
    this.props.setError(error.message);
  }

  render() {
    const {error} = this.props;
    if (error) {
      return (
        <div style={{margin: '20px'}}>
          <h2>Something went wrong</h2>
          <p>Error message: {error}</p>
        </div>
      )
    }

    return this.props.children;
  }
}

const mapStateToProps = ({payload}) => ({
  error: payload.error
})

const mapDispatchToProps = dispatch => ({
  setError: (message) => dispatch(setErrorAction(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary)
