import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/account';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    this.props.handleSignIn({ email, password }, this.props.homeProps.history);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { toggleClass } = this.props;

    return (
      <div id="login" className={toggleClass ? 'hidden' : ''}>
        <h1>Welcome Back!</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="field-wrap">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="field-wrap">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className="button button-block">
            Login
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignIn: (user, history) => dispatch(fetchUser('sign_in', user, history)),
});

export default connect(null, mapDispatchToProps)(Login);
