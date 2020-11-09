import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/account';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      email,
      password,
      password_confirmation
    } = this.state;
    this.props.handleSignUp(
      { email, password, password_confirmation },
      this.props.homeProps.history);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div id='signup'>
  
        <h1>Sign Up</h1>

        <form onSubmit={this.handleSubmit}>

          
          <div className='field-wrap'>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="type your email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="field-wrap">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="field-wrap">
              <label>Password Confirmation</label>
              <input
                type="password"
                name="password_confirmation"
                placeholder="password"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
          </div>

          <button type="submit" className='buton button-block'>Register</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignUp: (user, history) => dispatch(fetchUser('sign_up', user, history))
});

export default connect(null, mapDispatchToProps)(Registration);
