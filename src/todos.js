'use strict'
import uuidv4 from 'uuid/v4';

let todos = [];
//CRUD operations
//===============

const addTodo = (text) => {
    todos.push({
        id:  uuidv4(),
        text,
        completed: false 
    });
    setTodos();
}

const loadTodos = () => {
    const todosJson = localStorage.getItem('todos');
    try {
        todos = todosJson != null ? JSON.parse(todosJson) : [];
    } catch (e) {
        console.log('Local storage data is corrupt.  Data lost');
        return [];
    }
};

const getTodos = () => todos;

const setTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const removeTodo = (id) =>  {
    const noteIndex = todos.findIndex((todo) => todo.id === id);

    if(noteIndex >= 0) {
       todos.splice(noteIndex, 1);
    }
}

const toggleTodo = (id) =>  {
    const todo = todos.find((todo) => todo.id === id);
    if(todo) {
        todo.completed = !todo.completed;
    }
};

loadTodos();

export {
    addTodo,
    getTodos,
    setTodos,
    removeTodo,
    toggleTodo
}