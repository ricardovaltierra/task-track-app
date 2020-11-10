import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  faChartBar,
  faAngleDoubleRight,
  faChartPie,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUser } from "../actions/account";
import TaskList from "./TaskList";
import Profile from "./Profile";
import TaskRecords from "./TaskRecords";
import RecordList from "./RecordList";
import Progress from "./Progress";
import NewTask from "./NewTask";
import NewRecord from "./NewRecord";
import { fetchTasks } from "../actions/task";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      tabColor: "wheat",
    };

    this.onLogout = this.onLogout.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    this.props.handleSignStatus().then(() => {
      if (this.props.accountState.logged_in === false)
        this.props.history.push("/");
      else
        this.setState({
          user: this.props.accountState.user.email,
        });
    });
  }

  onLogout() {
    this.props.handleLogout(this.props.history);
  }

  onDelete(user) {
    this.props.handleLogout(this.props.history).then(() => {
      this.props.handleDeleteUser(user);
    });
  }

  onReset() {
    this.props.handleReset();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="top-dashboard">
          <div className="title">
            <div className="avatar"></div>
            <h2>Account: {this.state.user}</h2>
          </div>
        </div>
        <div className="component-wrapper">
          <Switch>
            <Route
              exact
              path="/dashboard/tasks/:task_id/new"
              render={(props) => <NewRecord {...props} />}
            />
            <Route exact path="/dashboard/tasks" render={() => <TaskList />} />
            <Route
              exact
              path="/dashboard/tasks/new"
              render={(props) => <NewTask {...props} />}
            />
            <Route
              exact
              path="/dashboard/tasks/:task_id"
              render={(props) => <TaskRecords {...props} />}
            />
            <Route
              exact
              path="/dashboard/records/new"
              render={(props) => <NewRecord {...props} />}
            />
            <Route path="/dashboard/records" render={() => <RecordList />} />
            <Route
              path="/dashboard/progress"
              render={() => <Progress onReset={this.onReset} />}
            />
            <Route
              path="/dashboard/profile"
              render={(props) => (
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

const mapStateToProps = (state) => ({
  accountState: state.account,
  appState: state,
});

const mapDispatchToProps = (dispatch) => ({
  handleSignStatus: () => dispatch(fetchUser("sign_status")),
  handleLogout: (history) => dispatch(fetchUser("sign_out", {}, history)),
  handleDeleteUser: (user) => dispatch(fetchUser("delete_user", user)),
  handleReset: () => dispatch(fetchTasks("reset")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
