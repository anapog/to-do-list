import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('<ToDoList /> test suite', () => {
	test('should render to-do-list container', () => {
		render(<App />);
		const listContainer = screen.getByTestId('to-do-list');
		expect(listContainer).toBeInTheDocument();
	});

	test('should render a form', () => {
		render(<App />);
		const form = screen.getByTestId('task-form');
		expect(form).toBeInTheDocument();
	});

	test('should render a list', () => {
		render(<App />);
		const list = screen.getByTestId('task-list');
		expect(list).toBeInTheDocument();
	});
});
