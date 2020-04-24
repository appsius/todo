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
	const p = document.createElement('p');
	p.textContent = todo.text;
	return p;
};

// Generate DOM structure for summary
const generateSummaryDOM = function (incompletedTodos) {
	const summary = document.createElement('h2');
	summary.textContent = `You have ${incompletedTodos.length} left todos.`;
	return summary;
};
