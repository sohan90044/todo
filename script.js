
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

// Application State
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save state to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render the todo list
function render() {
    todoList.innerHTML = '';

    if (todos.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    todos.forEach((todo) => {
        const li = document.createElement('li');

        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="todo-content-left">
                <input
                    type="checkbox"
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                />
                <span class="todo-text">${escapeHtml(todo.text)}</span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteTodo(${todo.id})"
            >Delete</button>
        `;

        todoList.appendChild(li);
    });
}

// Add Task Handler
function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    render();
}

// Toggle Task Completion
window.toggleTodo = function(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }

        return todo;
    });

    saveTodos();
    render();
};

// Delete Task Handler
window.deleteTodo = function(id) {
    todos = todos.filter((todo) => todo.id !== id);

    saveTodos();
    render();
};

// Utility to sanitize HTML strings
function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

// Form Submission Event Listener
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = todoInput.value.trim();

    if (text !== '') {
        addTodo(text);
        todoInput.value = '';
    }
});

// Initial Page Load Initialization
render();
