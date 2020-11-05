import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecords } from '../actions/record';
import { fetchTasks } from '../actions/task';

class NewRecord extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks:[],
      percentage: '',
      value: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {

    const { match, handleFetchTasks } = this.props;
    const { params } = match;
    const { task_id } = params; 

    handleFetchTasks().then(() => {
      this.setState({
        tasks: this.props.tasks.map(task => [task.id, task.name, task.created_at]),
        value: task_id
      })
    })
  }
  

  handleSubmit(e) {
    e.preventDefault();

    const { percentage, value } = this.state;
    const { user_id, history } = this.props;

    this.props.handleNewRecord({ percentage, user_id, value }, history);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelect(e){
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='new-task-form'>

          <select name='task-record' value={this.state.value} onChange={this.handleSelect}>
            {
              this.state.tasks.map(task => <option key={task[2]} value={task[0]}>{task[1]}</option>)
            }
          </select>

          <input
            type="number"
            name="percentage"
            placeholder="0"
            value={this.state.percentage}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Save record</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.items,
  user_id: state.account.user.id
});

const mapDispatchToProps = dispatch => ({
  handleNewRecord: (record, history) => dispatch(fetchRecords('save', record, history)),
  handleFetchTasks: () => dispatch(fetchTasks())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRecord);