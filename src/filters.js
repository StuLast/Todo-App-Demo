const filters = {
    text: "",
    hideCompletedTodos: false
}

const getFilters = () => filters;

const setFilters = ({text, hideCompletedTodos}) => {

    if(typeof text === "string") {
        filters.text = text;
    }

    if(typeof hideCompletedTodos === "boolean") {
        filters.hideCompletedTodos = 
        hideCompletedTodos;
    }
}

export {
    getFilters,
    setFilters
}

