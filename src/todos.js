'use strict'
import uuidv4 from 'uuid/v4';

//CRUD operations
//===============


const addTodo = (text) => {
    todos.push({
        id:  uuidv4(),
        text,
        completed: false 
    });
    setTodos(todos);
}

const getTodos = () => {
    const todosJson = localStorage.getItem('todos');
    try {
        return todosJson != null ? JSON.parse(todosJson) : [];
    } catch (e) {
        console.log('Local storage data is corrupt.  Data lost');
        return [];
    }
};

const setTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const removeTodo = (todos, id) =>  {
    const noteIndex = todos.findIndex((todo) => todo.id === id);

    if(noteIndex >= 0) {
       todos.splice(noteIndex, 1);
    }
}

const toggleTodo = (todos, id) =>  {
    const todo = todos.find((todo) => todo.id === id);
    if(todo) {
        todo.completed = !todo.completed;
    }
};
const todos = getTodos();

export {
    addTodo,
    getTodos,
    setTodos, 
    removeTodo,
    toggleTodo
}