/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  faChartBar,
  faAngleDoubleRight,
  faChartPie,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchUser } from '../actions/fetchCalls';
import TaskList from './TaskList';
import Profile from './Profile';
import TaskRecords from './TaskRecords';
import RecordList from './RecordList';
import Progress from './Progress';
import NewTask from './NewTask';
import NewRecord from './NewRecord';
import { fetchTasks } from '../actions/fetchCalls';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
    };

    this.onLogout = this.onLogout.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    const { handleSignStatus } = this.props;

    handleSignStatus().then(() => {
      const { accountState, history } = this.props;
      const { loggedIn } = accountState;
      const { user } = accountState;

      if (loggedIn === false) history.push('/');
      else {
        this.setState({
          user: user.email,
        });
      }
    });
  }

  onLogout() {
    const { handleLogout, history } = this.props;
    handleLogout(history);
  }

  onDelete(user) {
    const { handleLogout, handleDeleteUser, history } = this.props;

    handleLogout(history).then(() => {
      handleDeleteUser(user);
    });
  }

  onReset() {
    const { handleReset } = this.props;
    handleReset();
  }

  render() {
    const { user } = this.state;

    return (
      <div className="dashboard">
        <div className="top-dashboard">
          <div className="title">
            <div className="avatar" />
            <h2>
              Account:
              {user}
            </h2>
          </div>
        </div>
        <div className="component-wrapper">
          <Switch>
            <Route
              exact
              path="/dashboard/tasks/:task_id/new"
              render={props => <NewRecord {...props} />}
            />
            <Route exact path="/dashboard/tasks" render={() => <TaskList />} />
            <Route
              exact
              path="/dashboard/tasks/new"
              render={props => <NewTask {...props} />}
            />
            <Route
              exact
              path="/dashboard/tasks/:task_id"
              render={props => <TaskRecords {...props} />}
            />
            <Route
              exact
              path="/dashboard/records/new"
              render={props => <NewRecord {...props} />}
            />
            <Route path="/dashboard/records" render={() => <RecordList />} />
            <Route
              path="/dashboard/progress"
              render={() => <Progress onReset={this.onReset} />}
            />
            <Route
              path="/dashboard/profile"
              render={props => (
                <Profile
                  {...props}
                  onLogout={this.onLogout}
                  onDelete={this.onDelete}
                />
              )}
            />
          </Switch>
        </div>
        <div className="bottom-dashboard component-links">
          <Link to="/dashboard/tasks" className="menu-item">
            <FontAwesomeIcon icon={faChartBar} size="1x" />
            <div>Tasks</div>
          </Link>
          <Link to="/dashboard/records" className="menu-item">
            <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" />
            <div>Records</div>
          </Link>
          <Link to="/dashboard/progress" className="menu-item">
            <FontAwesomeIcon icon={faChartPie} size="1x" />
            <div>Progress</div>
          </Link>
          <Link to="/dashboard/profile" className="menu-item">
            <FontAwesomeIcon icon={faAddressCard} size="1x" />
            <div>Profile</div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountState: state.account,
});

const mapDispatchToProps = dispatch => ({
  handleSignStatus: () => dispatch(fetchUser('sign_status')),
  handleLogout: history => dispatch(fetchUser('sign_out', {}, history)),
  handleDeleteUser: user => dispatch(fetchUser('delete_user', user)),
  handleReset: () => dispatch(fetchTasks('reset')),
});

Dashboard.propTypes = {
  handleSignStatus: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  accountState: PropTypes.shape({
    loggedIn: PropTypes.bool,
    username: PropTypes.func,
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
