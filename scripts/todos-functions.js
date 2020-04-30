'use strict';

// Get existing localStorage
const getSavedTodos = () => {
	const todosJSON = localStorage.getItem('todos');

	try {
		return todosJSON ? JSON.parse(todosJSON) : [];
	} catch (e) {
		return [];
	}
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

	if (todo) {
		todo.completed = !todo.completed;
	}
};

// Render application todos
const renderTodos = (todos, filters) => {
	const todoEl = document.querySelector('#todos');
	const filteredTodos = todos.filter((todo) => {
		const searchTextMatch = todo.text
			.toLowerCase()
			.includes(filters.searchText.toLowerCase());
		const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

		return searchTextMatch && hideCompletedMatch;
	});
	const incompletedTodos = filteredTodos.filter((todo) => !todo.completed);

	todoEl.innerHTML = '';
	todoEl.appendChild(generateSummaryDOM(incompletedTodos));

	if (filteredTodos.length > 0) {
		filteredTodos.forEach((todo) => {
			todoEl.appendChild(generateTodoDOM(todo));
		});
	} else {
		const messageEl = document.createElement('p');
		messageEl.classList.add('empty-message');
		messageEl.textContent = 'No todos to show...';
		todoEl.appendChild(messageEl);
	}
};

// Generate DOM structure for a todo
const generateTodoDOM = (todo) => {
	const todoEl = document.createElement('label');
	const containerEl = document.createElement('div');
	const checkbox = document.createElement('input');
	const todoText = document.createElement('span');
	const removeButton = document.createElement('button');

	// Set checkbox
	checkbox.setAttribute('type', 'checkbox');
	checkbox.checked = todo.completed;
	containerEl.appendChild(checkbox);
	checkbox.addEventListener('change', () => {
		toggleTodo(todo.id);
		saveTodos(todos);
		renderTodos(todos, filters);
	});

	// Set text content
	todoText.textContent = todo.text;
	containerEl.appendChild(todoText);

	// Setup container
	todoEl.classList.add('list-item');
	containerEl.classList.add('list-item__container');
	todoEl.appendChild(containerEl);

	// Set remove button
	removeButton.textContent = 'remove';
	removeButton.classList.add('button', 'button--text');
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
	const plural = incompletedTodos.length === 1 ? '' : 's';
	summary.classList.add('list-title');
	summary.textContent = `You have ${incompletedTodos.length} left todo${plural}.`;
	return summary;
};
