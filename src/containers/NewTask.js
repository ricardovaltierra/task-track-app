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
      user_id: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, description, completion } = this.state;
    const { user_id } = this.props;

    this.props.handleNewTask({ 
      name, description, completion, user_id },
      this.props.history)

    console.log('new task props', this.props);

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className=''>
        <form onSubmit={this.handleSubmit} className='new-task-form'>
          <input
            type="text"
            name="name"
            placeholder="Task to be done"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Give a brief description"
            value={this.state.desription}
            onChange={this.handleChange}
            required
          />


          <input
            type="number"
            name="completion"
            placeholder="0"
            value={this.state.completion}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Save task</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.account.user.id
});

const mapDispatchToProps = dispatch => ({
  handleNewTask: (task, history) => dispatch(fetchTasks('save', task, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);