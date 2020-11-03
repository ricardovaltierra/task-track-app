import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/account';
import Tasks from '../test_components/Tasks';
import Records from '../test_components/Records';
import Progress from '../test_components/Progress';
import Profile from '../test_components/Profile';

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
        <div className='component-wrapper'>
          <Switch>
            <Route path="/dashboard/tasks" render={() => <Tasks />} />
            <Route path="/dashboard/records" render={() => <Records />} />
            <Route path="/dashboard/progress" render={() => <Progress />} />
            <Route path="/dashboard/profile" render={() => <Profile />} />
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
  accountState: state.account,
  globalState: state
});

const mapDispatchToProps = dispatch => ({
  handleSignStatus: () => dispatch(fetchUser('sign_status')),
  handleLogout: history => dispatch(fetchUser('sign_out',{}, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);