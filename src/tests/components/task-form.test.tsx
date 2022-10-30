import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import TaskForm from '../../components/task-form/task-form';

const INPUT_VALUE = 'test';

const addValueSetup = (addTask: (description: string) => void) => {
	render(<TaskForm addTask={addTask} />);
	const input = screen.getByTestId('task-form-input');
	const button = screen.getByTestId('task-form-button');
	fireEvent.change(input, { target: { value: INPUT_VALUE } });
	return { input, button };
};

describe('<TaskForm /> test suite', () => {
	afterEach(cleanup);

	test('should render form', () => {
		const addTask = jest.fn();
		render(<TaskForm addTask={addTask} />);
		const form = screen.getByTestId('task-form');
		const input = screen.getByTestId('task-form-input');
		const placeholder = screen.getByPlaceholderText('New task...');
		const button = screen.getByTestId('task-form-button');
		expect(form).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(placeholder).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('should disable add button when no content', () => {
		const addTask = jest.fn();
		render(<TaskForm addTask={addTask} />);
		const button = screen.getByTestId('task-form-button');
		fireEvent.click(button);
		expect(button).toHaveAttribute('disabled');
		expect(addTask).not.toHaveBeenCalled();
	});

	test('should enable add button when content added', () => {
		const addTask = jest.fn();
		const { button } = addValueSetup(addTask);
		expect(button).not.toHaveAttribute('disabled');
	});

	test('should reset input value when form submision', () => {
		const addTask = jest.fn();
		const { input, button } = addValueSetup(addTask);
		fireEvent.click(button);
		expect(input.getAttribute('value')).toBe('');
	});

	test('should call addTask when form submision', () => {
		const addTask = jest.fn();
		const { button } = addValueSetup(addTask);
		fireEvent.click(button);
		expect(addTask).toHaveBeenCalledTimes(1);
		expect(addTask).toHaveBeenCalledWith(INPUT_VALUE);
	});
});
