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
    let { toggleClass } = this.props;

    return (
      <div id='signup' className={toggleClass ? '' : 'hidden'}>
  
        <h1>Sign Up</h1>

        <form onSubmit={this.handleSubmit}>

          <div className='field-wrap'>
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

          <div className="field-wrap">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
          </div>

          <button type="submit" className='button button-block'>Register</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignUp: (user, history) => dispatch(fetchUser('sign_up', user, history))
});

export default connect(null, mapDispatchToProps)(Registration);
