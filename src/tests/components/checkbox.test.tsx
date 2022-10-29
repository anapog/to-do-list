import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Checkbox from '../../components/checkbox/checkbox';

const onChange = jest.fn();
const UNCHECKED_MOCK = { id: 13, label: 'Description', value: false, onChange };
const CHECKED_MOCK = { id: 13, label: 'Description', value: true, onChange };

describe('<Checkbox /> test suite', () => {
	afterEach(cleanup);

	test('should render checkbox and label', () => {
		render(<Checkbox {...UNCHECKED_MOCK} />);
		const checkbox = screen.getByTestId('checkbox');
		const label = screen.getByText(UNCHECKED_MOCK.label);
		expect(checkbox).toBeInTheDocument();
		expect(label).toBeInTheDocument();
	});

	test('should execute handleChange with id when user clicks', () => {
		render(<Checkbox {...UNCHECKED_MOCK} />);
		const checkbox = screen.getByTestId('checkbox-input');
		fireEvent.click(checkbox, { target: { value: true } });
		expect(onChange).toHaveBeenCalledWith(UNCHECKED_MOCK.id);
	});

	test('should have checked class when checkbox is active', () => {
		render(<Checkbox {...CHECKED_MOCK} />);
		const checkbox = screen.getByTestId('checkbox');
		expect(checkbox).toHaveClass('checked');
	});
});
