import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/fetchCalls';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password, passwordConfirmation } = this.state;
    const { handleSignUp, homeProps } = this.props;
    const { history } = homeProps;
    handleSignUp(
      { email, password, passwordConfirmation }, history,
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { toggleClass } = this.props;
    const { email, password, passwordConfirmation } = this.state;

    return (
      <div id="signup" className={toggleClass ? '' : 'hidden'}>
        <h1>Sign Up</h1>

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
              required
            />
          </div>

          <div className="field-wrap">
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              value={passwordConfirmation}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className="button button-block">
            Register
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignUp: (user, history) => dispatch(fetchUser('sign_up', user, history)),
});

Registration.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  homeProps: PropTypes.shape({
    history: PropTypes.shape({}),
  }).isRequired,
  toggleClass: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(Registration);
