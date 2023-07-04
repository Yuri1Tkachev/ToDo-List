import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './Listmain.css';

function TodoList() {
  const [todos, setTodos] = useState(
    localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
  );
  const [inputTodoTextValue, setInputTodoTextValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [inputTodoTextEditValue, setInputTodoTextEditValue] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputTodoTextChange = (event) => {
    setInputTodoTextValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputTodoTextValue.trim() === '') {
      return;
    }
    const todo = {
      id: uuid(),
      text: inputTodoTextValue,
      color: generateRandomColor(),
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
    setInputTodoTextValue('');
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    do {
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (color === '#FFFFFF');

    return color;
  };

  const handleTodoDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleTodoEdit = (id, text) => {
    setEditId(id);
    setInputTodoTextEditValue(text);
    setEditMode(true);
  };

  const handleSaveEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: inputTodoTextEditValue } : todo
      )
    );
    setEditId(null);
    setInputTodoTextEditValue('');
    setEditMode(false);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Add new todo..."
          className="inputTodo"
          type="text"
          value={inputTodoTextValue}
          onChange={handleInputTodoTextChange}
        />
        <button className="addBtn" type="submit">
          Add Todo
        </button>
        <audio src=""></audio>
      </form>
      <ul className="newTodoList">
        {todos.map((todo) => (
          <li
            className={`newTodoItem${todo.id === editId ? ' editing' : ''}`}
            key={todo.id}
            style={{ backgroundColor: todo.color }}
            onDoubleClick={() => handleTodoEdit(todo.id, todo.text)}
          >
            {todo.id === editId && editMode ? (
              <input
                type="text"
                value={inputTodoTextEditValue}
                onChange={(event) => setInputTodoTextEditValue(event.target.value)}
                onBlur={() => handleSaveEdit(todo.id)}
                autoFocus
              />
            ) : (
              todo.text
            )}
            <button
              className="newTodoBtn"
              onClick={() => handleTodoDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
