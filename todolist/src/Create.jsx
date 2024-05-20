import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks(); // Fetch tasks when component mounts
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:3001/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(err => console.log(err));
    };

    const handleAdd = () => {
        if (!task) {
            setMessage('Enter text to add');
            setIsSuccess(false);
            return;
        }

        axios.post('http://localhost:3001/add', { task: task })
            .then(result => {
                setMessage('Successfully added');
                setIsSuccess(true);
                setTask('');
                fetchTasks(); // Update tasks after adding a new task
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='create_force'>
            <input
                type='text' placeholder='Enter Task' value={task} onChange={(e) => setTask(e.target.value)} className='input-box'
            />
            &nbsp;
            <button type='button' onClick={handleAdd} className='add-button'>
                Add
            </button>
            {message && (
                <div className={`popup-message ${isSuccess ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            {/* Display the tasks */}
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Create;
