import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from '../../components/checkbox/checkbox';

const handleChange = jest.fn();
const UNCHECKED_MOCK = { id: 13, label: 'Description', value: false, onChange: handleChange };
const CHECKED_MOCK = { id: 13, label: 'Description', value: true, onChange: handleChange };

describe('<Checkbox /> test suite', () => {
	test('should render checkbox and label', () => {
		render(<Checkbox {...UNCHECKED_MOCK} />);
		const checkbox = screen.getByTestId('checkbox');
		const label = screen.getByText(UNCHECKED_MOCK.label);
		expect(checkbox).toBeInTheDocument();
		expect(label).toBeInTheDocument();
	});

	test('should execute handleChange on click', () => {
		render(<Checkbox {...UNCHECKED_MOCK} />);
		const checkbox = screen.getByTestId('checkbox-input');
		fireEvent.click(checkbox, { target: { value: 'on' } });
		expect(handleChange).toHaveBeenCalled();
	});

	test('should have checked class on active checkbox', () => {
		render(<Checkbox {...CHECKED_MOCK} />);
		const checkbox = screen.getByTestId('checkbox');
		expect(checkbox).toHaveClass('checked');
	});
});
