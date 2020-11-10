import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions/task';

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
    const { user_id } = this.props;

    this.props.handleNewTask(
      {
        name, description, completion, user_id,
      },
      this.props.history,
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="form-tr">
        <form onSubmit={this.handleSubmit} className="new-task-form">
          <div className="field-wrap">
            <input
              type="text"
              name="name"
              placeholder="Your awesome task..."
              value={this.state.name}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="field-wrap">
            <textarea
              name="description"
              placeholder="Describe it a bit"
              value={this.state.desription}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="field-wrap">
            <input
              type="number"
              name="completion"
              placeholder="Covered"
              value={this.state.completion}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className="button button-block">
            Save task
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.account.user.id,
});

const mapDispatchToProps = dispatch => ({
  handleNewTask: (task, history) => dispatch(fetchTasks('save', task, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
