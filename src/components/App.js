import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from "axios";
import Home from './Home';
import Dashboard from './Dashboard';

class App extends Component {

  checkLoginStatus() {
    axios.get('https://steptracking-api.herokuapp.com/logged_in', { withCredentials: true })
    .then((response) => {
      console.log(response);
      // if(response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {}
      // else if(!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN'){}
    }).catch((error) => console.log('login? error: ', error));
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route 
            exact 
            path="/" 
            render={props => (
              <Home 
              {...props}  
              handleLogout={this.props.handleLogout}
              // loggedInStatus={this.state.loggedInStatus}
              />
            )} 
            />
            <Route 
            exact 
            path="/dashboard" 
            render={props => (
              <Dashboard 
                {...props} 
                // loggedInStatus={this.state.loggedInStatus}
                /> 
            )} 
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;