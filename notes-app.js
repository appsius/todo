const todos = [
	{
		text: 'Clean the kitchen',
		completed: false,
	},
	{
		text: 'Cook meal',
		completed: true,
	},
	{
		text: 'Code JS',
		completed: true,
	},
	{
		text: 'Buy a mac',
		completed: false,
	},
	{
		text: 'Breed the plants',
		completed: true,
	},
];

const filters = {
	searchText: '',
};

const renderTodos = function (todos, filters) {
	const filteredTodos = todos.filter(function (todo) {
		return todo.text
			.toLowerCase()
			.includes(filters.searchText.toLowerCase());
	});

	document.querySelector('#todos').innerHTML = '';

	const incompletedTodos = filteredTodos.filter(function (todo) {
		return !todo.completed;
	});

	const summary = document.createElement('h2');
	summary.textContent = `You have ${incompletedTodos.length} left todos.`;
	document.querySelector('#todos').appendChild(summary);

	filteredTodos.forEach(function (todo) {
		const p = document.createElement('p');
		p.textContent = todo.text;
		document.querySelector('#todos').appendChild(p);
	});
};

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', function (e) {
	filters.searchText = e.target.value;
	renderTodos(todos, filters);
});

document.querySelector('#new-todo').addEventListener('submit', function (e) {
	e.preventDefault();

	todos.push({
		text: e.target.elements.text.value,
		completed: false,
	});

	renderTodos(todos, filters);

	e.target.elements.text.value = '';
});
