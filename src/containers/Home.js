import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/account';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: false,
      errorArray: []
    }
  }


  componentDidMount() {
    this.props.handleSignStatus().then(
      () => {
        if(this.props.logged_in) 
          this.props.history.push('/dashboard');
      })
  }

  render() {

    let { errors } = this.props;
    let containerClass = '';
    let jsonErrors = {};
    let errorItems = [];
      
    if (errors.length !== undefined) {
      containerClass = 'error-container'
      jsonErrors = JSON.parse(errors);
      for(let key in jsonErrors)
        if (jsonErrors.hasOwnProperty(key))
          errorItems.push(jsonErrors[key]);
    }
    else containerClass = 'hidden';

    return (
      <div className='home'>
      <div className={containerClass}>
        {
          errorItems.map((error, index) => <p key={index} className='error-item'>{error}</p>)
        }
      </div>
        <div className='title'><h1>Tasktracker</h1></div>
        <Registration homeProps={this.props} />
        <Login homeProps={this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged_in: state.account.logged_in,
  errors: state.account.errors
});

const mapDispatchToProps = dispatch => ({
  handleSignStatus: () => dispatch(fetchUser('sign_status'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);