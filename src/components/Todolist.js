// src/components/TodoList.js
import React, { useState } from 'react';
import { addTodoToServer } from '../api'; // Simulate server request
import { FaTrashAlt } from 'react-icons/fa'; // Import trash icon from react-icons

const TodoList = () => {
  const [todos, setTodos] = useState([]); // Start with an empty todo list
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Add a new todo with optimistic UI update
  const addTodo = async () => {
    if (inputValue.trim() === '') return;

    const newTodo = { id: Date.now(), text: inputValue, completed: false };
    setTodos([...todos, newTodo]);
    setInputValue('');

    setLoading(true);
    try {
      await addTodoToServer(newTodo);
      setLoading(false);
    } catch (error) {
      setTodos(todos.filter(todo => todo.id !== newTodo.id));
      alert('Failed to save todo');
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Toggle the completion status of a todo
  const toggleTodoCompletion = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>

      {/* Input Box and Add Button */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}  // Listen for key press (Enter)
          placeholder="Add new todo"
          style={styles.input}
        />
        <button onClick={addTodo} disabled={loading} style={styles.addButton}>
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>

      {/* Todo List */}
      <div style={styles.todoList}>
        {todos.map(todo => (
          <div key={todo.id} style={styles.todoItem}>
            <input
              type="radio"
              checked={todo.completed}
              onChange={() => toggleTodoCompletion(todo.id)}
              style={styles.radioButton}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', ...styles.todoText }}>
              {todo.text}
            </span>
            <FaTrashAlt 
              style={styles.trashIcon} 
              onClick={() => deleteTodo(todo.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    width: '100px', // Fixed width for the button
    textAlign: 'center',
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column', // Make tasks appear one below another
    width: '100%', // Make it take the full width
    maxWidth: '500px', // Set a max width for the task list
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ccc',
    marginBottom: '10px', // Space between tasks
    width: '100%',
  },
  radioButton: {
    marginRight: '10px',
  },
  todoText: {
    flex: 1, // Makes the text take up the remaining space
    fontSize: '16px',
  },
  trashIcon: {
    marginLeft: '10px',
    cursor: 'pointer',
    color: '#dc3545',
    fontSize: '18px',
  },
};
