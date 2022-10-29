import { cleanup, render, screen } from '@testing-library/react';
import ToDoList from '../../pages/to-do-list/to-do-list';

describe('<ToDoList /> test suite', () => {
	afterEach(cleanup);

	test('should render to-do-list container', () => {
		render(<ToDoList />);
		const listContainer = screen.getByTestId('to-do-list');
		expect(listContainer).toBeInTheDocument();
	});

	test('should render a form', () => {
		render(<ToDoList />);
		const form = screen.getByTestId('task-form');
		expect(form).toBeInTheDocument();
	});

	test('should render a list', () => {
		render(<ToDoList />);
		const list = screen.getByTestId('task-list');
		expect(list).toBeInTheDocument();
	});
});
