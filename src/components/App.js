import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';

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
          </Switch>
        </Router>
      </div>
    );
  }
}



export default App;