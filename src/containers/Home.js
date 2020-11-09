import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/account';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: false,
    }

    this.toggleForm = this.toggleForm.bind(this);
  }


  componentDidMount() {
    this.props.handleSignStatus().then(
      () => {
        if(this.props.logged_in) 
          this.props.history.push('/dashboard');
      })
  }

  toggleForm() {
    const { form } = this.state;

    this.setState({ form: !form });
    console.log(form);
  }

  render() {

    let { errors } = this.props;
    let jsonErrors = {};
    let errorItems = [];
      
    if (errors.length !== undefined) {
      jsonErrors = JSON.parse(errors);
      for(let key in jsonErrors)
        if (jsonErrors.hasOwnProperty(key))
          errorItems.push(jsonErrors[key]);
    }

    return (
      <div className='home'>
        <div className='error-container'>
          {
            errorItems.map((error, index) => <p key={index} className='error-item'>{error}</p>)
          }
        </div>
        <div className='app-info'>
          <div className='logo'></div>
          <h1>Tasktracker</h1>
          </div>
        <div className='form'>
          <ul className='tab-group'>
            <li className='tab active' onClick={this.toggleForm}><p>Log in</p></li>
            <li className='tab' onClick={this.toggleForm}><p>Sign Up</p></li>
          </ul>
          <div className='tab-content'>
            <Login homeProps={this.props} />
            <Registration homeProps={this.props} />
          </div>
        </div>
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