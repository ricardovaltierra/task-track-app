import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';
import Record from './Record';
import TaskRecords from '../containers/TaskRecords';
import TaskList from '../containers/TaskList';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" 
              render={props => (<Home {...props} />)} 
            />
            <Route exact path="/dashboard" 
              render={props => (<Dashboard {...props} /> )} 
            />
            <Route exact path="/dashboard/tasks" 
              render={props => (<TaskList {...props} /> )} 
            />
          </Switch>
          <Switch>
            <Route exact path="/dashboard/tasks/:task_id/"
              render={props => (<TaskRecords {...props} />)}
            />
          </Switch>
          <Switch>
            <Route exact path="/dashboard/tasks/:task_id/:record_id"
              render={props => (<Record {...props} />)}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;