const todos = [
    { text: 'Make coffee', completed: true},
    { text: 'Drink coffee', completed: false},
    { text: 'have breakfast', completed: false},
    { text: 'go running', completed: true},
    { text: 'have shower', completed: true}
];

const getTodos = (todos) => {
    incompleteTodos(todos);
    todos.forEach((todo) => {
        renderTodo(todo);
    })
};

const incompleteTodos = (todos) => {
    const newDiv = document.createElement('div');
    const incompleteTodos = todos.filter((todo) => {
        return !todo.completed;
    });
    newDiv.innerHTML = `<h2>You have ${incompleteTodos.length} todos left to complete<h2>`;
    document.querySelector("#app").appendChild(newDiv);
};

const renderTodo = (todo) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<p>${todo.text}</p>`;
    document.querySelector("#app").appendChild(newDiv);
};

getTodos(todos);

document.querySelector("#btn_add_todo").addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Adding new todo");
});