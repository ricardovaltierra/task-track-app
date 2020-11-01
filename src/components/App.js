import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';
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
  }

  checkLoginStatus() {
    axios.get('https://steptracking-api.herokuapp.com/logged_in', { withCredentials: true })
    .then((response) => {
      console.log(response);
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
              handleLogout={this.props.handleLogout}
              loggedInStatus={this.state.loggedInStatus}
              user={this.state.user} />
            )} 
            />
            <Route 
            exact 
            path="/dashboard" 
            render={props => (
              <Dashboard 
                {...props} 
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user} /> 
            )} 
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(fetchUser('sign_out'))
});

export default connect(null, mapDispatchToProps)(App);