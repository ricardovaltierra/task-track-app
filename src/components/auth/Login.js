import React, { Component } from "react";
import axios from "axios";

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
    axios.post('https://steptracking-api.herokuapp.com/sessions', {
    // axios.post('http://localhost:3001/sessions', {
      user: {
        email: email,
        password: password,
      }
    },
    { withCredentials: true }
    ).then(response => {
      console.log('login response', response);
      if (response.data.logged_in)
        this.props.handleSuccessfulAuth(response.data)
    }).catch(error => 
      console.log('login error', error)
      );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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

          <button type="submit" className="button">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
