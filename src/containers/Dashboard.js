import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/account';
import TaskList from './TaskList';
import Profile from './Profile';
import TaskRecords from './TaskRecords';
import RecordList from './RecordList';
import Progress from './Progress';
import NewTask from './NewTask';
import NewRecord from './NewRecord';

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
            <h1>Logo</h1>
            <h2>Account: { this.state.user }</h2>
          </div>
        </div>
        <div className='component-wrapper'>
          <Switch>
            <Route exact path="/dashboard/tasks" render={() => <TaskList />} />
            <Route exact path="/dashboard/tasks/:task_id/new" render={props => <NewRecord {...props} />} />
            <Route exact path="/dashboard/tasks/new" render={props => <NewTask {...props} />} />
            <Route exact path="/dashboard/tasks/:task_id" render={props => <TaskRecords {...props} />} />
            <Route path="/dashboard/records" render={() => <RecordList />} />
            <Route path="/dashboard/progress" render={() => <Progress />} />
            <Route path="/dashboard/profile" render={(props) => <Profile {...props} onLogout={this.onLogout} />} />
          </Switch>
        </div>
        <div className='bottom-dashboard component-links'>
          <Link to='/dashboard/tasks' className='menu-item'>
            <div>Tasks</div>
          </Link>
          <Link to='/dashboard/records' className='menu-item'>
            <div>Records</div>
          </Link>
          <Link to='/dashboard/progress' className='menu-item'>
            <div>Progress</div>
          </Link>
          <Link to='/dashboard/profile' className='menu-item'>
            <div>Profile</div>
          </Link>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  accountState: state.account
});

const mapDispatchToProps = dispatch => ({
  handleSignStatus: () => dispatch(fetchUser('sign_status')),
  handleLogout: history => dispatch(fetchUser('sign_out',{}, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);