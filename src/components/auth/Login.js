import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      email,
      password
    } = this.state;

    this.props.handleSignIn({ email, password }, this.props.homeProps.history);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className='login'>
        <form onSubmit={this.handleSubmit} className='log-form'>
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

          <button type="submit" className="button" className='log-form'>Login</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignIn: (user, history) => dispatch(fetchUser('sign_in', user, history)),
});

export default connect(null, mapDispatchToProps)(Login);
