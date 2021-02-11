import { FaTimes } from 'react-icons/fa';

const Task = ({ task, deleteTask, showReminder }) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => showReminder(task.id)}
    >
      <FaTimes
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => {
          deleteTask(task.id);
        }}
      />
      <h3>{task.task}</h3>
      <p>{task.date}</p>
    </div>
  );
};

export default Task;
