import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecords } from '../actions/record';


class NewRecord extends Component {

  constructor(props) {
    super(props);

    this.state = {
      percentage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { percentage } = this.state;
    // const { user_id, task_id } = this.props;

    // this.props.handleNewRecord(
    //   { percentage, user_id, task_id  },
    //   this.props.history);

    console.log('record props', this.props)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='new-task-form'>

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
  appState: state
});

const mapDispatchToProps = dispatch => ({
  handleNewRecord: (record, history) => dispatch(fetchRecords('save', record, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRecord);