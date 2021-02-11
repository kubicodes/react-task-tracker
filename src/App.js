import { useState } from 'react';
import './App.css';
import Header from './components/header/header.component';
import Tasks from './components/tasks/tasks.components';
import Button from './components/button/button.component';
import Form from './components/form/form.component';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: 'Go to Gym',
      date: '23.01.2021',
      reminder: false,
    },
    {
      id: 2,
      task: 'Pay Billings',
      date: '23.03.2021',
      reminder: false,
    },
    {
      id: 3,
      task: 'Learn React',
      date: 'Always',
      reminder: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const showReminder = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const addTask = task => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const taskToSet = { id, ...task };

    setTasks([...tasks, taskToSet]);
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className='container'>
      <Header title='Task Tracker' />
      <Button
        text={showForm ? 'Close' : 'Add'}
        color={showForm ? 'red' : 'green'}
        toggleForm={() => {
          setShowForm(!showForm);
        }}
      />
      {showForm && <Form addTask={addTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          deleteTask={deleteTask}
          showReminder={showReminder}
        />
      ) : (
        'Nothing to Show'
      )}
    </div>
  );
}

export default App;
