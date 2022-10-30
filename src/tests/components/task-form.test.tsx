import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import TaskForm from '../../components/task-form/task-form';

const addTask = jest.fn();
const MOCK_DATA = { addTask };
const INPUT_VALUE = 'test';

const emptyFormSetup = () => {
	render(<TaskForm {...MOCK_DATA} />);
	const form = screen.getByTestId('task-form');
	const input = screen.getByTestId('task-form-input');
	const placeholder = screen.getByPlaceholderText('New task...');
	const button = screen.getByTestId('task-form-button');
	return { form, input, placeholder, button };
};

const addValueSetup = () => {
	render(<TaskForm {...MOCK_DATA} />);
	const input = screen.getByTestId('task-form-input');
	const button = screen.getByTestId('task-form-button');
	fireEvent.change(input, { target: { value: INPUT_VALUE } });
	return { input, button };
};

describe('<TaskForm /> test suite', () => {
	afterEach(cleanup);

	test('should render form', () => {
		const { form, input, placeholder, button } = emptyFormSetup();
		expect(form).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(placeholder).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('should disable add button when no content', () => {
		render(<TaskForm {...MOCK_DATA} />);
		const button = screen.getByTestId('task-form-button');
		fireEvent.click(button);
		expect(button).toHaveAttribute('disabled');
		expect(addTask).not.toHaveBeenCalled();
	});

	test('should enable add button when content added', () => {
		const { button } = addValueSetup();
		expect(button).not.toHaveAttribute('disabled');
	});

	test('should add value to input when user writes', () => {
		const { input } = addValueSetup();
		const placeholder = screen.queryByText('New task...');
		expect(input.getAttribute('value')).toBe(INPUT_VALUE);
		expect(placeholder).toBe(null);
	});

	test('should reset input value and call addTask when form submision', () => {
		const { input, button } = addValueSetup();
		fireEvent.click(button);
		expect(input.getAttribute('value')).toBe('');
		expect(addTask).toHaveBeenCalledTimes(1);
	});
});