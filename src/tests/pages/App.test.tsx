import { cleanup, render, screen } from '@testing-library/react';
import App from '../../App';

describe('<App /> test suite', () => {
	afterEach(cleanup);

	test('should render app container', () => {
		render(<App />);
		const applicationContainer = screen.getByTestId('app');
		expect(applicationContainer).toBeInTheDocument();
	});

	// TODO update with login page
	test('should redirect to main page', () => {
		render(<App />);
		expect(screen.getByTestId('to-do-list')).toBeInTheDocument();
	});
});
