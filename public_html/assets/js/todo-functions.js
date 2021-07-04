//CRUD operations
//===============

const getTodos = function () {
    const todosJson = localStorage.getItem('todos');
    if(todosJson != null) {
        return JSON.parse(todosJson)
    } else {
        return [];
    };
};

const setTodos = function(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
};

//Data Rendering
//==============

const incompleteTodos = (todos) => {
    const newDiv = document.createElement('div');
    const incompleteTodos = todos.filter((todo) => {
        return !todo.completed;
    });
    newDiv.innerHTML = `<h2>You have ${incompleteTodos.length} todos left to complete<h2>`;
    document.querySelector('#todos').appendChild(newDiv);
};

const renderTodos  = (todos, filter) => {
    
    //Clear todos list
    document.querySelector('#todos').innerHTML = "";

    //Carry out filtering
    const filteredTodos = todos.filter((todo) => {
        const searchFilterMatch = todo.text.toLowerCase().includes(filter.text.toLowerCase());
        const completedMatch = filter.hideCompletedTodos ? !todo.completed : true;
        return searchFilterMatch && completedMatch;
    });

    //Render data
    incompleteTodos(filteredTodos);
    sortTodos(filteredTodos);
    filteredTodos.forEach((todo) => {
        renderTodo(todo);
    });
};

const renderTodo = (todo) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<p>${todo.text}</p>`;
    document.querySelector('#todos').appendChild(newDiv);
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