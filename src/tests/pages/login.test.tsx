import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Login from '../../pages/login/login';
import { useAuth } from '../../providers/auth.provider';

const USERNAME = 'username';
const PASSWORD = 'password';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedNavigate,
}));

const mockLogin = jest.fn();
jest.mock('../../providers/auth.provider', () => ({
	useUser: jest.fn(),
	useAuth: jest.fn(),
}));
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
mockedUseAuth.mockReturnValue({
	user: { username: '', password: '' },
	login: mockLogin,
	logout: jest.fn(),
});

const initialSetup = () => {
	render(<Login />);
	const container = screen.getByTestId('login');
	const header = screen.getByText('To Do List');
	const intro = screen.getByText('Log in to continue:');
	const form = screen.getByTestId('login-form');
	const userPlaceholder = screen.getByPlaceholderText('Username');
	const userInput = screen.getByTestId('form-input-username');
	const passwordPlaceholder = screen.getByPlaceholderText('Password');
	const passwordInput = screen.getByTestId('form-input-password');
	const button = screen.getByTestId('login-form-button');

	return {
		container,
		header,
		intro,
		form,
		userPlaceholder,
		userInput,
		passwordPlaceholder,
		passwordInput,
		button,
	};
};

describe('<Login /> test suite', () => {
	afterEach(cleanup);

	test('should render login', () => {
		const {
			container,
			header,
			intro,
			form,
			userPlaceholder,
			userInput,
			passwordPlaceholder,
			passwordInput,
			button,
		} = initialSetup();
		expect(container).toBeInTheDocument();
		expect(header).toBeInTheDocument();
		expect(intro).toBeInTheDocument();
		expect(form).toBeInTheDocument();
		expect(userPlaceholder).toBeInTheDocument();
		expect(userInput).toBeInTheDocument();
		expect(passwordPlaceholder).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('should have disabled attribute in button when no inputs', () => {
		const { button } = initialSetup();
		fireEvent.click(button);
		expect(button).toHaveAttribute('disabled');
		expect(mockLogin).not.toHaveBeenCalled();
	});

	test('should enable button when content is added', () => {
		const { button, userInput, passwordInput } = initialSetup();
		fireEvent.change(userInput, { target: { value: USERNAME } });
		fireEvent.change(passwordInput, { target: { value: PASSWORD } });
		expect(button).not.toHaveAttribute('disabled');
	});

	test('should call login when user submits form', () => {
		const { button, userInput, passwordInput } = initialSetup();
		fireEvent.change(userInput, { target: { value: USERNAME } });
		fireEvent.change(passwordInput, { target: { value: PASSWORD } });
		fireEvent.click(button);
		expect(mockLogin).toHaveBeenCalledWith({ username: USERNAME, password: PASSWORD });
	});

	test('should call navigate when user logs in', () => {
		const { button, userInput, passwordInput } = initialSetup();
		fireEvent.change(userInput, { target: { value: USERNAME } });
		fireEvent.change(passwordInput, { target: { value: PASSWORD } });
		fireEvent.click(button);
		expect(mockedNavigate).toHaveBeenCalledTimes(1);
	});
});
