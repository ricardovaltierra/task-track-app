import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchTasks } from '../actions/fetchCalls';

class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      completion: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, description, completion } = this.state;
    const { handleNewTask, userId, history } = this.props;

    handleNewTask(
      {
        name, description, completion, userId,
      },
      history,
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { errors } = this.props;
    const { name, description, completion } = this.state;
    let jsonErrors = {};
    const errorItems = [];

    if (errors.length > 0) {
      jsonErrors = JSON.parse(errors);
      Object.keys(jsonErrors).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(jsonErrors, key)) errorItems.push(jsonErrors[key]);
      });
    }

    return (
      <>
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
        <div className="form-tr">
          <form onSubmit={this.handleSubmit} className="new-task-form">
            <div className="field-wrap">
              <input
                type="text"
                name="name"
                placeholder="Your awesome task..."
                value={name}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="field-wrap">
              <textarea
                name="description"
                placeholder="Describe it a bit"
                value={description}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="field-wrap">
              <input
                type="number"
                name="completion"
                placeholder="Covered"
                value={completion}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </div>

            <button type="submit" className="button button-block" data-testid="new-task-button">
              Save task
            </button>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.account.user.id,
  errors: state.tasks.errors,
});

const mapDispatchToProps = dispatch => ({
  handleNewTask: (task, history) => dispatch(fetchTasks('save', task, history)),
});

NewTask.propTypes = {
  handleNewTask: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  errors: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
