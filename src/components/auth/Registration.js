import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/index';

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
      this.props.homeProps);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className='registration'>
        <form onSubmit={this.handleSubmit} className='reg-form'>
          <input
            type="email"
            name="email"
            placeholder="type your email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />


          <input
            type="password"
            name="password_confirmation"
            placeholder="password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit" className="button" className='reg-button'>Register</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignUp: (user, homeProps) => dispatch(fetchUser('sign_up', user, homeProps))
});

export default connect(null, mapDispatchToProps)(Registration);
