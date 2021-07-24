'use strict'

//CRUD operations
//===============

const getTodos = function () {
    const todosJson = localStorage.getItem('todos');
    try {
        return todosJson != null ? JSON.parse(todosJson) : [];
    } catch (e) {
        console.log('Local storage data is corrupt.  Data lost');
        return [];
    }
};

const setTodos = function(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const removeTodo = function (todos, id) {
    const noteIndex = todos.findIndex((todo) => todo.id === id);

    if(noteIndex >= 0) {
       todos.splice(noteIndex, 1);
    }
}

const toggleTodo = function (todos, id) {
    const todo = todos.find((todo) => todo.id === id);
    if(todo) {
        todo.completed = !todo.completed;
    }
};
 
//Data Rendering
//==============

const incompleteTodos = (todos) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('list-title');
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    const plural = incompleteTodos.length === 1 ? `` :`s`;
    newDiv.innerHTML = `<h2>You have ${incompleteTodos.length} todo${plural} left to complete<h2>`;
    document.querySelector('#todos').appendChild(newDiv);
};

const renderTodos  = (todos, filter) => {
    const todosElement = document.querySelector('#todos');
    
    //Clear todos list
    todosElement.innerHTML = "";

    //Carry out filtering
    const filteredTodos = todos.filter((todo) => {
        const searchFilterMatch = todo.text.toLowerCase().includes(filter.text.toLowerCase());
        const completedMatch = filter.hideCompletedTodos ? !todo.completed : true;
        return searchFilterMatch && completedMatch;
    });

    //Render data
    incompleteTodos(filteredTodos);
    sortTodos(filteredTodos);

    if(filteredTodos.length < 1) {
        console.log('Ther are no todos');
        const message = document.createElement('p');
        message.textContent = "There are currently no todos to show."
        message.classList.add('empty-message');
        todosElement.appendChild(message);
        return;
    }

    filteredTodos.forEach((todo) => {
        todosElement.appendChild(generateTodoDOM(todo));
    });
};

const generateTodoDOM = (todo) => {
    const todoLabel = document.createElement('label');
    const todoContainer = document.createElement('div');
    const todoCheckBox = document.createElement('input')
    const todoText = document.createElement('span');
    const todoRemoveButton = document.createElement('button');

    todoRemoveButton.classList.add('button', 'button--text');
    todoLabel.classList.add('list-item');
    todoContainer.classList.add('list-item__container');
    
    todoRemoveButton.addEventListener('click', (e) => {
        removeTodo(todos, todo.id);
        setTodos(todos);
        renderTodos(todos, filters);
    });

    todoCheckBox.setAttribute('type', 'checkbox');
    todoCheckBox.addEventListener('click', (e) => {
        toggleTodo(todos, todo.id);
        setTodos(todos);
        renderTodos(todos, filters);
    });

    todoCheckBox.checked = todo.completed;

    todoText.textContent = todo.text;
    todoRemoveButton.textContent = 'remove';

    todoContainer.appendChild(todoCheckBox);
    todoContainer.appendChild(todoText);
    todoLabel.appendChild(todoContainer);
    todoLabel.appendChild(todoRemoveButton);

    return todoLabel;
};

const sortTodos = (todos) => {
    todos.sort((a, b) => {
        if(!a.completed && b.completed) {
            return -1;
        } else if (a.completed && !b.completed) {
            return 1;
        } else {
            return 0;
        }
    })
};