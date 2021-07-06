//Data Storage

let todos = getTodos();

const filters = {
    text: "",
    hideCompletedTodos: false
}

//startup
//=======

renderTodos(todos, filters);

//Define event listeners
//======================

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    const dataSource = e.target.elements.inputAddTodo;
    todos.push({
        id:  uuidv4(),
        text:dataSource.value,
        completed: false 
    });
    setTodos(todos);
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



