import React from 'react';
import '../style/App.css'
import ListCategories from './ListCategories';
import { connect } from 'react-redux';

export default class Example extends React.Component {
  state = {
    activeTab: '1',
    showCategory: true,
    showPostDetails: false,
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <div className="header-title">
          <h1>Readable</h1>
        </div>
        {this.state.showCategory &&
           (
             <ListCategories />
           )
      }
      </div>
    );
  }
}
