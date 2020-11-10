/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
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
        tasks: tasks.map(task => [
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
    const { handleNewRecord, userId, history } = this.props;

    handleNewRecord({ percentage, userId, value }, history, flag);
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
    const { value, tasks, percentage } = this.state;

    return (
      <div className="form-tr record">
        <form onSubmit={this.handleSubmit} className="new-task-form">
          <div className="field-wrap">
            <select
              name="task-record"
              value={value}
              onChange={this.handleSelect}
              className="task-option"
            >
              {tasks.map(task => (
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
              value={percentage}
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
  userId: state.account.user.id,
});

const mapDispatchToProps = dispatch => ({
  handleNewRecord: (record, history, flag) => dispatch(fetchRecords('save', record, history, flag)),
  handleFetchTasks: () => dispatch(fetchTasks()),
});

NewRecord.propTypes = {
  handleNewRecord: PropTypes.func.isRequired,
  handleFetchTasks: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      task_id: PropTypes.string,
    }),
  }).isRequired,
  tasks: PropTypes.array.isRequired, /* eslint-disable-line react/forbid-prop-types */
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRecord);
