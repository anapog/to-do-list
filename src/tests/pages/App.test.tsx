import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('<App /> test suite', () => {
	test('should render app container', () => {
		render(<App />);
		const applicationContainer = screen.getByTestId('app');
		expect(applicationContainer).toBeInTheDocument();
	});

	test('shoudl redirect to main page', () => {
		render(<App />);
		expect(screen.getByTestId('to-do-list')).toBeInTheDocument();
	});
});