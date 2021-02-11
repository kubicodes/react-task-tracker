import Task from '../task/task.component';

const Tasks = ({ tasks, deleteTask, showReminder }) => {
  return tasks.map(task => (
    <Task
      key={task.id}
      task={task}
      deleteTask={deleteTask}
      showReminder={showReminder}
    />
  ));
};

export default Tasks;
