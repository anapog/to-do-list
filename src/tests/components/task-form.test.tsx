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

	test('should disable add button until content is added', () => {
		render(<TaskForm {...MOCK_DATA} />);
		const button = screen.getByTestId('task-form-button');
		expect(button).toHaveAttribute('disabled');
	});

	test('should enable add button on content added', () => {
		const { button } = addValueSetup();
		expect(button).not.toHaveAttribute('disabled');
	});

	test('should add written value to input', () => {
		const { input } = addValueSetup();
		expect(input.getAttribute('value')).toBe(INPUT_VALUE);
	});

	test('should reset input value and call addTask after form submision', () => {
		const { input, button } = addValueSetup();
		fireEvent.click(button);
		expect(input.getAttribute('value')).toBe('');
		expect(addTask).toHaveBeenCalledTimes(1);
	});
});
