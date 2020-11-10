import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';

const App = () => (
  <div className="app">
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  </div>
);

export default App;
