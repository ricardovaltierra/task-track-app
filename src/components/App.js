import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';
import Home from './Home';
import Dashboard from './Dashboard';

class App extends Component {

  componentDidMount() {
    this.props.handleSignStatus();
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
              />
            )} 
            />
            <Route 
            exact 
            path="/dashboard" 
            render={props => (
              <Dashboard 
                {...props}
                /> 
            )} 
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignStatus: () => dispatch(fetchUser('sign_status'))
})

export default connect(null, mapDispatchToProps)(App);