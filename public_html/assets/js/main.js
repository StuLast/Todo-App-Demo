//Arrays for development
//======================

const todos = [
    { text: 'Make coffee', completed: true},
    { text: 'Drink coffee', completed: false},
    { text: 'have breakfast', completed: false},
    { text: 'go running', completed: true},
    { text: 'have shower', completed: true}
];

const filters = {
    text: "",
    hideCompletedTodos: false
}

//Functions
//=========

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
}

//Define event listeners
//======================

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    const dataSource = e.target.elements.inputAddTodo
    todos.push({
        text:dataSource.value,
        completed: false
    });
    dataSource.value = ""; 
    renderTodos(todos, filters);
});

document.querySelector('#input-search-todo').addEventListener('input', (e) => {
    e.preventDefault();
    filters.text = e.target.value;
    renderTodos(todos, filters);
});

document.querySelector('#hide-completed-todos').addEventListener('change', (e) => {
    filters.hideCompletedTodos = e.target.checked;
    renderTodos(todos, filters);
});

//startup
//=======
renderTodos(todos, filters);