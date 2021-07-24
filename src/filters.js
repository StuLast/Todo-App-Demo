const filters = {
    text: "",
    hideCompletedTodos: false
}

const getFilters = () => filters;

const setFilters = (updates = {}) => {
    if(!updates) {
        return;
    }

    if(typeof updates.text === "string") {
        filters.text = updates.text;
    }

    if(typeof updates.hideCompletedTodos === "boolean") {
        filters.hideCompletedTodos = updates.hideCompletedTodos;
    }
}

export {
    getFilters,
    setFilters
}

