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
    text: ""
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
    const filteredTodos = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(filter.text.toLowerCase()) && !todo.completed
    })

    document.querySelector('#todos').innerHTML = "";
    incompleteTodos(filteredTodos);
    filteredTodos.forEach((todo) => {
        renderTodo(todo);
    });
};

const renderTodo = (todo) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<p>${todo.text}</p>`;
    document.querySelector('#todos').appendChild(newDiv);
};

//Define event listeners
//======================

document.querySelector('#btn_add_todo').addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Adding new todo");
});

document.querySelector('#input-add-todo').addEventListener('input', (e) => {
    e.preventDefault();
    console.log(e.target.value);
});

document.querySelector('#input-search-todo').addEventListener('input', (e) => {
    e.preventDefault();
    filters.text = e.target.value;
    renderTodos(todos, filters);
});


//startup
//=======
renderTodos(todos, filters);