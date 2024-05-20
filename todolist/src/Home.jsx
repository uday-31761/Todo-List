import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import './App.css';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err));
    };

    // const handleClearAll = () => {
    //     axios.delete('http://localhost:3001/clear')
    //         .then(result => {
    //             console.log('Clear All Response:', result);
    //             setTodos([]);
    //         })
    //         .catch(err => console.log(err));
    // };

    return (
        <div className="home">
            <h1 align="center">Todo List</h1>
            <h2 align="center">My Todo List</h2>
            <Create />&nbsp;
            <div className="todos-container" align="left">
                {
                    todos.length === 0
                        ? <div><h2 align="center">No Record</h2></div>
                        : todos.map(todo => (
                            <div className="task" key={todo._id}>
                                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                    {todo.done ? 
                                        <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                                        : <BsCircleFill className='icon' />
                                    }
                                    <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                                </div>
                                <div>
                                    <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                                </div>
                            </div>
                        ))
                }
            </div>
            {/* {todos.length > 0 && (
                <button className="clear-all-button" onClick={handleClearAll}>
                    Clear All
                </button>
            )} */}
        </div>
    );
}

export default Home;
