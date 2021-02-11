import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header.component';
import Tasks from './components/tasks/tasks.components';
import Button from './components/button/button.component';
import Form from './components/form/form.component';

function App() {
  const [tasks, setTasks] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const showReminder = async id => {
    const task = await fetchTask(id);
    const updatedTask = { ...task, reminder: !task.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  };

  const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };

    getTasks();
  }, []);

  const addTask = async task => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const deleteTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

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
