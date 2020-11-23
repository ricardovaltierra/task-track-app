import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/fetchCalls';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { handleSignIn, homeProps } = this.props;
    const { history } = homeProps;
    const { email, password } = this.state;

    handleSignIn({ email, password }, history);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { toggleClass } = this.props;
    const { email, password } = this.state;

    return (
      <div id="login" className={toggleClass ? 'hidden' : ''}>
        <h1>Welcome Back!</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="field-wrap">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
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
              value={password}
              onChange={this.handleChange}
              autoComplete="off"
              data-testid="login-password"
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

Login.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
  homeProps: PropTypes.shape({
    history: PropTypes.shape({}),
  }).isRequired,
  toggleClass: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
