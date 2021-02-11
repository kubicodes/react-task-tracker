import { useState } from 'react';

const Form = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [reminder, setReminder] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    addTask({ task, date, reminder });

    setTask('');
    setDate('');
    setReminder(false);
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          value={task}
          onChange={e => setTask(e.target.value)}
        />
      </div>

      <div className='form-control'>
        <label>Date</label>
        <input
          type='text'
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      <div className='form-control form-control-check'>
        <label>Reminder</label>
        <input
          type='checkbox'
          className='form-control-check'
          value={reminder}
          checked={reminder}
          onChange={e => setReminder(e.target.checked)}
        />
      </div>

      <input type='submit' className='btn' value='Add Task' />
    </form>
  );
};

export default Form;
