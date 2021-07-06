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

const removeTodo = function (todos, id) {
    const noteIndex = todos.findIndex((todo) => {
        return todo.id === id;
    });

    if(noteIndex >= 0) {
       todos.splice(noteIndex, 1);
    }
}

const toggleTodo = function (id) {
    const todo = todos.find((todo) => {
        return todo.id === id;
    });
    
    if(todo !== undefined) {
        todo.completed = !todo.completed;
    }
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
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    });
};

const generateTodoDOM = (todo) => {
    const newDiv = document.createElement('div');
    const newCheckBox = document.createElement('input')
    const newText = document.createElement('span');
    const newButton = document.createElement('button');
    
    newButton.addEventListener('click', (e) => {
        toggleTodo(todo.id);
        setTodos(todos);
        renderTodos(todos, filters);
    });

    newCheckBox.setAttribute('type', 'checkbox');
    newCheckBox.addEventListener('click', (e) => {
        toggleTodo(todo.id);
        setTodos(todos);
        renderTodos(todos, filters);
    });

    newCheckBox.checked = todo.completed;

    newText.textContent = todo.text;
    newButton.textContent = 'X';

    newDiv.appendChild(newCheckBox);
    newDiv.appendChild(newText);
    newDiv.appendChild(newButton);

    return newDiv;
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