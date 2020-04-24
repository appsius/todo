// Get existing localStorage
const getSavedTodos = function () {
	const todosJSON = localStorage.getItem('todos');

	if (todosJSON !== null) {
		return JSON.parse(todosJSON);
	} else {
		return [];
	}
};

// Save todos to localStorage
const saveTodos = function (todos) {
	localStorage.setItem('todos', JSON.stringify(todos));
};

// Remove a todo from the list
const removeTodo = function (id) {
	const todoIndex = todos.findIndex(function (todo) {
		return todo.id === id;
	});

	if (todoIndex > -1) {
		todos.splice(todoIndex, 1);
	}
};

// Toggle the complete value for a given todo
const toggleTodo = function (id) {
	const todo = todos.find(function (todo) {
		return todo.id === id;
	});

	if (todo !== undefined) {
		todo.completed = !todo.completed;
	}
};

// Render application todos
const renderTodos = function (todos, filters) {
	const filteredTodos = todos.filter(function (todo) {
		const searchTextMatch = todo.text
			.toLowerCase()
			.includes(filters.searchText.toLowerCase());
		const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

		return searchTextMatch && hideCompletedMatch;
	});

	const incompletedTodos = filteredTodos.filter(function (todo) {
		return !todo.completed;
	});

	document.querySelector('#todos').innerHTML = '';
	document
		.querySelector('#todos')
		.appendChild(generateSummaryDOM(incompletedTodos));

	filteredTodos.forEach(function (todo) {
		document.querySelector('#todos').appendChild(generateTodoDOM(todo));
	});
};

// Generate DOM structure for a todo
const generateTodoDOM = function (todo) {
	const todoEl = document.createElement('div');
	const checkbox = document.createElement('input');
	const todoText = document.createElement('span');
	const removeButton = document.createElement('button');

	// Set checkbox
	checkbox.setAttribute('type', 'checkbox');
	checkbox.checked = todo.completed;
	todoEl.appendChild(checkbox);
	checkbox.addEventListener('change', function () {
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
	removeButton.addEventListener('click', function () {
		removeTodo(todo.id);
		saveTodos(todos);
		renderTodos(todos, filters);
	});

	return todoEl;
};

// Generate DOM structure for summary
const generateSummaryDOM = function (incompletedTodos) {
	const summary = document.createElement('h2');
	summary.textContent = `You have ${incompletedTodos.length} left todos.`;
	return summary;
};
