import { cleanup, render, screen } from '@testing-library/react';
import { useCookies } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

import App from '../../App';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigate,
}));

jest.mock('react-cookie', () => ({
	useCookies: jest.fn(),
}));
const mockedUseCookies = useCookies as jest.MockedFunction<typeof useCookies>;
mockedUseCookies.mockImplementation(() => [{}, jest.fn(), jest.fn()]);

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

	test('should redirect to login page when user cookie does not exist', () => {
		initialSetup();
		expect(screen.getByTestId('login')).toBeInTheDocument();
	});

	test('should redirect to home pages when user cookie exists', () => {
		mockedUseCookies.mockImplementation(() => [
			{ TODOLISTSESSION: 'e-kfyX0CeEE4=R/Pb3U2-zYe14R6Tjon/' },
			jest.fn(),
			jest.fn(),
		]);
		initialSetup();
		expect(screen.getByTestId('to-do-list')).toBeInTheDocument();
	});
});
