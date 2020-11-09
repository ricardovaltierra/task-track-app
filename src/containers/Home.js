import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/account';

class Home extends Component {
  constructor(props) {
    super(props);

    this.renderErrors = this.renderErrors.bind(this);
  }


  componentDidMount() {
    this.props.handleSignStatus().then(
      () => {
        
        if(this.props.logged_in) 
          this.props.history.push('/dashboard');
      })
  }

  renderErrors() {
    let errors = this.props.errors;
    let renderText = [];

    if (errors.length !== undefined) { 
      const jsonErrors = JSON.parse(errors);
      for(let key in jsonErrors) {
        if (jsonErrors.hasOwnProperty(key))
          renderText.push(jsonErrors[key][0]);
      }
    }

    return renderText.map((text, index) => <p key={index} className='home-error'>{text}</p>);
  }

  render() {

    return (
      <div className='home'>
      <div className='error-container'>
        {this.renderErrors()}
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