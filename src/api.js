// src/api.js
export const addTodoToServer = (newTodo) => {
    return new Promise((resolve, reject) => {
      // Simulate random success/failure
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% success rate
        if (success) {
          resolve(newTodo);
        } else {
          reject(new Error('Failed to add todo'));
        }
      }, 1000); // 1 second delay
    });
  };
  