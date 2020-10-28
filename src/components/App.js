import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from "axios";
import Home from './Home';
import Dashboard from './Dashboard';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
    .then((response) => {
      if(response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN')
        this.setState({ 
          loggedInStatus: 'LOGGED_IN',
          user: response.data.user
        })

      else if(!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN')
        this.setState({ 
          loggedInStatus: 'NOT_LOGGED_IN',
          user: {}
        })

    }).catch((error) => console.log('login? error: ', error));
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  handleLogout() {
    axios.delete('http://localhost:3001/logout', { withCredentials: true })
    .then((response) => {
      if (response.data.logged_out)
      this.setState({
        loggedInStatus: 'NOT_LOGGED_IN',
        user: {}
      });
    }).catch(error => 
      console.log('logout error: ', error)
      );
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    });
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
              handleLogin={this.handleLogin} 
              handleLogout={this.handleLogout}
              loggedInStatus={this.state.loggedInStatus} />
            )} 
            />
            <Route 
            exact 
            path="/dashboard" 
            render={props => (
              <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} /> 
            )} 
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;