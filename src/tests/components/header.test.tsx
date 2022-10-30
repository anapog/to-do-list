import { cleanup, fireEvent, screen, render } from '@testing-library/react';
import Header from '../../components/header/header';
import { useAuth } from '../../providers/auth.provider';
import { LOGIN_PATH } from '../../constants/route-paths';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedNavigate,
}));

const mockLogout = jest.fn();
jest.mock('../../providers/auth.provider', () => ({
	useUser: jest.fn(),
	useAuth: jest.fn(),
}));
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
mockedUseAuth.mockReturnValue({
	user: { username: '', password: '' },
	login: jest.fn(),
	logout: mockLogout,
});

const initialSetup = () => {
	render(<Header />);
	const container = screen.getByTestId('app-header');
	const button = screen.getByTestId('header-logout');
	return { container, button };
};

describe('<Header /> test suite', () => {
	afterEach(cleanup);

	test('should render header', () => {
		const { container, button } = initialSetup();
		expect(container).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('should call logout when user clicks on button', () => {
		const { button } = initialSetup();
		fireEvent.click(button);
		expect(mockLogout).toHaveBeenCalledTimes(1);
	});

	test('should call navigate when logout is done', () => {
		const { button } = initialSetup();
		fireEvent.click(button);
		expect(mockedNavigate).toHaveBeenCalledTimes(1);
		expect(mockedNavigate).toHaveBeenCalledWith(LOGIN_PATH);
	});
});
