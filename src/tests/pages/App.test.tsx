import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

const initialSetup = () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
};

describe('<App /> test suite', () => {
	afterEach(cleanup);

	test('should render app container', () => {
		initialSetup();
		const applicationContainer = screen.getByTestId('app');
		expect(applicationContainer).toBeInTheDocument();
	});

	// TODO update with login page
	test('should redirect to main page', () => {
		initialSetup();
		expect(screen.getByTestId('to-do-list')).toBeInTheDocument();
	});
});
