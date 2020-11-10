import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecords } from '../actions/record';
import { fetchTasks } from '../actions/task';

class NewRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      percentage: '',
      value: '',
      flag: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { handleFetchTasks } = this.props;

    handleFetchTasks().then(() => {
      const { match, tasks } = this.props;
      const { params } = match;
      const { task_id } = params;

      let setFlag = false;
      let setValue = '';

      if (task_id === undefined) {
        setFlag = true;
        setValue = tasks.length === 0 ? '' : tasks[0].id;
      }

      this.setState({
        tasks: this.props.tasks.map(task => [
          task.id,
          task.name,
          task.created_at,
        ]),
        value: task_id || setValue,
        flag: setFlag,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { percentage, value, flag } = this.state;
    const { user_id, history } = this.props;

    this.props.handleNewRecord({ percentage, user_id, value }, history, flag);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSelect(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <div className="form-tr record">
        <form onSubmit={this.handleSubmit} className="new-task-form">
          <div className="field-wrap">
            <select
              name="task-record"
              value={this.state.value}
              onChange={this.handleSelect}
              className="task-option"
            >
              {this.state.tasks.map(task => (
                <option key={task[2]} value={task[0]}>
                  {task[1]}
                </option>
              ))}
            </select>
          </div>

          <div className="field-wrap">
            <input
              type="number"
              name="percentage"
              placeholder="0"
              value={this.state.percentage}
              onChange={this.handleChange}
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className="button button-block">
            Save record
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.items,
  user_id: state.account.user.id,
});

const mapDispatchToProps = dispatch => ({
  handleNewRecord: (record, history, flag) => dispatch(fetchRecords('save', record, history, flag)),
  handleFetchTasks: () => dispatch(fetchTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRecord);
