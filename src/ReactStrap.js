import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './App.css'
import ArrowUpIcon from 'react-icons/lib/ti/arrow-sorted-up'
import ArrowDownIcon from 'react-icons/lib/ti/arrow-sorted-down'
import AddIcon from 'react-icons/lib/md/add-circle'

export default class Example extends React.Component {
  state = {
    activeTab: '1',
    showCategory: true,
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
          <div className="category-content">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Tab1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Moar Tabs
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row className="post-content">
                  <div className="post-vote-content">
                      <button className="icon-btn-vote">
                        <ArrowUpIcon size={30} />
                      </button>
                      <p className="post-voteScore">150</p>
                      <button className="icon-btn-vote">
                        <ArrowDownIcon size={30} />
                      </button>
                  </div>
                  <div className="post-title-content">
                    <p>This is post title</p>
                    <p>Submitted by Author. Datetime</p>
                  </div>
                </Row>
                <hr />
                <Row className="post-content">
                  <div className="post-vote-content">
                      <button className="icon-btn-vote">
                        <ArrowUpIcon size={30} />
                      </button>
                      <p className="post-voteScore">12</p>
                      <button className="icon-btn-vote">
                        <ArrowDownIcon size={30} />
                      </button>
                  </div>
                  <div className="post-title-content">
                    <p>This is post title 2</p>
                    <p>Submitted by Author 2. Datetime 2</p>
                  </div>
                </Row>
                <hr />

                <div className="new-post">
                  <a>
                    <AddIcon size={50}/>
                  </a>
                </div>
              </TabPane>

              <TabPane tabId="2">
                <div className="post-detail-content">
                    <div className="post-vote-content">
                        <button className="icon-btn-vote">
                          <ArrowUpIcon size={30} />
                        </button>
                        <p className="post-voteScore">150</p>
                        <button className="icon-btn-vote">
                          <ArrowDownIcon size={30} />
                        </button>
                    </div>
                    <div className="post-title-content">
                      <p>This is post title</p>
                      <p>Submitted by Author. Datetime</p>
                      <div clasName="post-body-content">
                        <p> This is the post content </p>
                      </div>
                    </div>

                </div>

              </TabPane>
            </TabContent>
          </div>
        )

      }


      </div>
    );
  }
}
