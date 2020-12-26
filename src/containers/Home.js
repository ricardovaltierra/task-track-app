/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Registration from './auth/Registration';
import Login from './auth/Login';
import { fetchUser } from '../actions/fetchCalls';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: 'tab active',
      signup: 'tab',
      hidden: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    const { handleSignStatus } = this.props;

    handleSignStatus().then(() => {
      const { loggedIn, history } = this.props;

      if (loggedIn) history.push('/dashboard');
    });
  }

  toggleForm(e) {
    if (e.target.innerHTML === 'Log In') {
      this.setState({
        login: 'tab active',
        signup: 'tab',
        hidden: false,
      });
    } else if (e.target.innerHTML === 'Sign Up') {
      this.setState({
        login: 'tab',
        signup: 'tab active',
        hidden: true,
      });
    }
  }

  render() {
    const { errors } = this.props;
    const { hidden, login, signup } = this.state;
    let jsonErrors = {};
    const errorItems = [];

    if (errors.length > 0) {
      jsonErrors = JSON.parse(errors);
      Object.keys(jsonErrors).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(jsonErrors, key)) errorItems.push(jsonErrors[key]);
      });
    }

    return (
      <div className="home">
        <div className="error-container">
          {errorItems.map(error => (
            <p
              key={`${error}-${error.length}`}
              className="error-item"
            >
              {error}
            </p>
          ))}
        </div>
        <div className="app-info">
          <div className="logo" />
          <h1 data-testid="home-title">Tasktrack</h1>
        </div>
        <div className={hidden ? 'form register' : 'form'}>
          <ul className="tab-group">
            <li className={login} onClick={this.toggleForm}>
              {' '}
              <p>Log In</p>
            </li>
            <li className={signup} onClick={this.toggleForm}>
              {' '}
              <p>Sign Up</p>
            </li>
          </ul>
          <div className="tab-content">
            <Login homeProps={this.props} toggleClass={hidden} />
            <Registration
              homeProps={this.props}
              toggleClass={hidden}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.account.loggedIn,
  errors: state.account.errors,
});

const mapDispatchToProps = dispatch => ({
  handleSignStatus: () => dispatch(fetchUser('sign_status')),
});

Home.propTypes = {
  handleSignStatus: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  errors: PropTypes.string,
};

Home.defaultProps = {
  errors: '',
  loggedIn: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
