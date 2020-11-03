import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/account';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    }

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    console.log('Dashboard props', this.props);
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
            <h1>Dashboard</h1>
            <h2>{ this.state.user }</h2>
          </div>
          <button onClick={this.onLogout}>Logout</button>
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