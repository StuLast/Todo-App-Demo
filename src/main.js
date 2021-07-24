'use strict'

import {setFilters} from './filters';
import {addTodo, getTodos} from './todos';
import renderTodos from './views';


//startup
//=======

renderTodos();

//Define event listeners
//======================

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    const dataSource = e.target.elements.inputAddTodo;
    const text = dataSource.value.trim();
    if(!text) {
        console.log("There is no content to add");
        return;
    }
    addTodo (text);
    dataSource.value = ""; 
    renderTodos();
});

document.querySelector('#input-search-todo').addEventListener('input', (e) => {
    e.preventDefault();
    setFilters({text: e.target.value});
    renderTodos();
});

document.querySelector('#hide-completed-todos').addEventListener('change', (e) => {
    e.preventDefault();
    setFilters({hideCompletedTodos: e.target.checked});
    renderTodos();
});



