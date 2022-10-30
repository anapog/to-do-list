import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/login/login';

const USERNAME = 'username';
const PASSWORD = 'password';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../providers/auth.provider', () => ({
	...jest.requireActual('../../providers/auth.provider'),
	useUser: () => ({ setUser: jest.fn() }),
	useAuth: () => ({
		user: { username: '', password: '' },
		login: jest.fn(),
		logout: jest.fn(),
	}),
}));

const initialSetup = () => {
	render(
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	);
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
		expect(button).toHaveAttribute('disabled');
	});

	test('should enable button when content is added', () => {
		const { button, userInput, passwordInput } = initialSetup();
		fireEvent.change(userInput, { target: { value: USERNAME } });
		fireEvent.change(passwordInput, { target: { value: PASSWORD } });
		expect(button).not.toHaveAttribute('disabled');
	});
});
