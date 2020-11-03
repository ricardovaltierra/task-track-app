import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/account';
import Record from '../components/Record';
import TaskRecords from '../containers/TaskRecords';
import TaskList from '../containers/TaskList';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    }

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    
    this.props.handleSignStatus().then(
      () => {
        console.log('Dashboard props', this.props);
        if(this.props.accountState.logged_in === false) 
          this.props.history.push('/');
        else this.setState({ 
          user: this.props.accountState.user.email
        })
      })
  }

  onLogout() {
    this.props.handleLogout(this.props.history)
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='top-dashboard'>
          <div className='title'>
            <h1>Dashboard</h1>
            <h2>{ this.state.user }</h2>
          </div>
          <button onClick={this.onLogout}>Logout</button>
        </div>
        <div className='bottom-dashboard'>
        <Link to='/dashboard/tasks' className='menu-item'>
          <div>Tasks</div>
        </Link>
        <Link to='/dashboard/tasks' className='menu-item'>
          <div>Records</div>
        </Link>
        <Link to='/dashboard/tasks' className='menu-item'>
          <div>Progress</div>
        </Link>
        <Link to='/dashboard/tasks' className='menu-item'>
          <div>Profile</div>
        </Link>
        </div>
        <Router>
          <Switch>
            <Route exact path="/dashboard/tasks" 
              render={props => (<TaskList {...props} /> )} 
            />
            <Route exact path="/dashboard/tasks/:task_id/"
              render={props => (<TaskRecords {...props} />)}
            />
            <Route exact path="/dashboard/tasks/:task_id/:record_id"
              render={props => (<Record {...props} />)}
            />
          </Switch>
        </Router>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  accountState: state.account,
  globalState: state
});

const mapDispatchToProps = dispatch => ({
  handleSignStatus: () => dispatch(fetchUser('sign_status')),
  handleLogout: history => dispatch(fetchUser('sign_out',{}, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);