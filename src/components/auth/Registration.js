import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
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
    axios.post('https://steptracking-api.herokuapp.com/registrations', {
    // axios.post('http://localhost:3001/registrations', {
      user: {
        email: email,
        password: password, 
        password_confirmation: password_confirmation
      }
    },
    { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created')
        this.props.handleSuccessfulAuth(response.data)
    }).catch(error => 
      console.log('registration error', error)
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


          <input
            type="password"
            name="password_confirmation"
            placeholder="password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit" className="button">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
