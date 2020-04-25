// Get existing localStorage
const getSavedTodos = () => {
	const todosJSON = localStorage.getItem('todos');
	return todosJSON !== null ? JSON.parse(todosJSON) : [];
};

// Save todos to localStorage
const saveTodos = (todos) => {
	localStorage.setItem('todos', JSON.stringify(todos));
};

// Remove a todo from the list
const removeTodo = (id) => {
	const todoIndex = todos.findIndex((todo) => todo.id === id);

	if (todoIndex > -1) {
		todos.splice(todoIndex, 1);
	}
};

// Toggle the complete value for a given todo
const toggleTodo = (id) => {
	const todo = todos.find((todo) => todo.id === id);

	if (todo !== undefined) {
		todo.completed = !todo.completed;
	}
};

// Render application todos
const renderTodos = (todos, filters) => {
	const filteredTodos = todos.filter((todo) => {
		const searchTextMatch = todo.text
			.toLowerCase()
			.includes(filters.searchText.toLowerCase());
		const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

		return searchTextMatch && hideCompletedMatch;
	});

	const incompletedTodos = filteredTodos.filter((todo) => !todo.completed);

	document.querySelector('#todos').innerHTML = '';
	document
		.querySelector('#todos')
		.appendChild(generateSummaryDOM(incompletedTodos));

	filteredTodos.forEach((todo) => {
		document.querySelector('#todos').appendChild(generateTodoDOM(todo));
	});
};

// Generate DOM structure for a todo
const generateTodoDOM = (todo) => {
	const todoEl = document.createElement('div');
	const checkbox = document.createElement('input');
	const todoText = document.createElement('span');
	const removeButton = document.createElement('button');

	// Set checkbox
	checkbox.setAttribute('type', 'checkbox');
	checkbox.checked = todo.completed;
	todoEl.appendChild(checkbox);
	checkbox.addEventListener('change', () => {
		toggleTodo(todo.id);
		saveTodos(todos);
		renderTodos(todos, filters);
	});

	// Set text content
	todoText.textContent = todo.text;
	todoEl.appendChild(todoText);

	// Set remove button
	removeButton.textContent = 'x';
	todoEl.appendChild(removeButton);
	removeButton.addEventListener('click', () => {
		removeTodo(todo.id);
		saveTodos(todos);
		renderTodos(todos, filters);
	});

	return todoEl;
};

// Generate DOM structure for summary
const generateSummaryDOM = (incompletedTodos) => {
	const summary = document.createElement('h2');
	summary.textContent = `You have ${incompletedTodos.length} left todos.`;
	return summary;
};
